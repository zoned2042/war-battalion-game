// Battalions: creation, stats, pathing, movement and orders.

import { clamp, lerp, MinHeap } from '../core/util.js';
import { UNIT_TYPES, TERRAIN, WORLD, xpLevel, LEAF } from '../data/config.js';

const BASE_SPEED = 34; // world units per hour on open ground
const SLOT_OFFSETS = [
  [0, 0],
  [30, 16],
  [-30, 16],
  [0, -30],
  [30, -16],
  [-30, -16],
  [0, 32],
];

let nextUnitId = 1;
export function resetUnitIds() {
  nextUnitId = 1;
}

export function createUnit(game, def) {
  const t = UNIT_TYPES[def.type];
  const max = def.max || t.max;
  const strengthMult = def.side === LEAF ? 1 : game.diff.enemyStrength;
  const c = game.map.cells[def.cell];
  const u = {
    id: nextUnitId++,
    side: def.side,
    name: def.name,
    short: def.short,
    type: def.type,
    army: def.army || null,
    captain: def.captain || game.rng.pick(game.captainPool),
    max: Math.round(max * strengthMult),
    soldiers: Math.round((def.soldiers || max) * strengthMult),
    morale: def.morale ?? game.rng.float(0.74, 0.9),
    org: def.org ?? game.rng.float(0.82, 1),
    xp: def.xp ?? 8,
    x: c.x,
    y: c.y,
    cell: def.cell,
    heading: def.side === LEAF ? 0 : Math.PI,
    path: [],
    dest: null,
    restSlot: 0,
    order: { type: 'idle' },
    stance: 'normal',
    entrench: 0,
    battle: null,
    role: null,
    routed: false,
    surrounded: false,
    shakenUntil: -1,
    alive: true,
    moving: false,
    speedNow: 0,
    lastRepath: 0,
    warnedMorale: false,
    stats: { won: 0, lost: 0, captured: 0 },
    task: null, // AI task
    born: game.time,
  };
  return u;
}

export function unitTypeName(u) {
  return UNIT_TYPES[u.type].name;
}

export function unitLevel(u) {
  return xpLevel(u.xp);
}

export function strengthFrac(u) {
  return u.soldiers / u.max;
}

export function unitStatus(game, u) {
  if (!u.alive) return 'Destroyed';
  if (u.routed) return 'Routed — regrouping';
  if (u.battle) return u.role === 'att' ? 'Attacking' : 'Under attack!';
  if (u.order.type === 'retreat') return 'Retreating';
  if (u.order.type === 'reinforce' && u.moving) return 'Moving to reinforce';
  if (u.order.type === 'attack' && u.moving) return 'Advancing to attack';
  if (u.moving) return 'Moving';
  if (u.stance === 'defend') return u.entrench > 0.6 ? 'Dug in' : 'Digging in';
  if (u.surrounded) return 'Surrounded!';
  if (u.org < 0.5) return 'Recovering';
  return 'Ready';
}

// ------------------------------------------------------------- path finding
export function moveFactor(game, u, from, to) {
  const map = game.map;
  const ct = map.cells[to];
  const cf = map.cells[from];
  let m = (TERRAIN[ct.terrain].move + TERRAIN[cf.terrain].move) / 2;
  const e = map.edge(from, to);
  if (e && e.road && cf.road && ct.road) m = Math.max(m, 1) * 1.7;
  return m;
}

export function riverBlocked(game, e) {
  if (!e || !e.river) return false;
  return !(e.bridge && e.bridge.destroyedUntil < game.time);
}

// mode: 'move' | 'attack' | 'retreat'
export function findPath(game, u, goal, mode = 'move') {
  const map = game.map;
  const start = u.cell;
  if (start === goal) return [];
  const cells = map.cells;
  if (!cells[goal].passable) return null;
  const n = cells.length;
  const dist = new Float64Array(n).fill(Infinity);
  const prev = new Int32Array(n).fill(-1);
  const heap = new MinHeap();
  dist[start] = 0;
  heap.push(start, 0);
  const g = cells[goal];
  const speed = UNIT_TYPES[u.type].speed;
  const occ = game.occupancy();
  const enemy = 1 - u.side;
  while (heap.size) {
    const cur = heap.pop();
    if (cur === goal) break;
    const cc = cells[cur];
    for (const nb of cc.nbrs) {
      const cn = cells[nb];
      if (!cn.passable) continue;
      const e = map.edge(cur, nb);
      const len = Math.hypot(cn.x - cc.x, cn.y - cc.y);
      let cost = len / (moveFactor(game, u, cur, nb) * speed);
      if (riverBlocked(game, e)) cost += 150;
      const enemyHere = occ[enemy][nb] > 0;
      if (enemyHere) {
        if (mode === 'retreat') continue;
        if (nb !== goal) cost += mode === 'attack' ? 160 : 260;
      }
      if (mode === 'retreat' && cn.owner === enemy) cost *= 4;
      const nd = dist[cur] + cost;
      if (nd < dist[nb]) {
        dist[nb] = nd;
        prev[nb] = cur;
        heap.push(nb, nd + Math.hypot(cn.x - g.x, cn.y - g.y) / (1.7 * speed));
      }
    }
  }
  if (!isFinite(dist[goal])) return null;
  const path = [];
  for (let v = goal; v !== start && v >= 0; v = prev[v]) path.push(v);
  return path.reverse();
}

export function pathLength(game, u) {
  const map = game.map;
  let len = 0;
  let px = u.x;
  let py = u.y;
  for (const id of u.path) {
    const c = map.cells[id];
    len += Math.hypot(c.x - px, c.y - py);
    px = c.x;
    py = c.y;
  }
  return len;
}

export function etaHours(game, u) {
  const sp = BASE_SPEED * UNIT_TYPES[u.type].speed * 0.85;
  return pathLength(game, u) / sp;
}

// ------------------------------------------------------------- movement
function restPoint(game, u) {
  const c = game.map.cells[u.cell];
  const o = SLOT_OFFSETS[u.restSlot % SLOT_OFFSETS.length];
  return [c.x + o[0], c.y + o[1]];
}

function assignSlot(game, u) {
  const used = new Set();
  for (const o of game.units) {
    if (o !== u && o.alive && o.cell === u.cell && !o.moving) used.add(o.restSlot);
  }
  let s = 0;
  while (used.has(s)) s++;
  u.restSlot = s;
}

export function setPath(game, u, path) {
  u.path = path || [];
  u.moving = u.path.length > 0;
  u.entrench = 0;
  if (u.moving) u.stance = 'normal';
  if (!u.moving) assignSlot(game, u);
}

// Point where an attacker stands while assaulting `target` from its own cell.
export function attackPoint(game, u, target) {
  const map = game.map;
  const c = map.cells[u.cell];
  const e = map.edge(u.cell, target);
  if (!e) return [c.x, c.y];
  return [lerp(c.x, e.mx, 0.62), lerp(c.y, e.my, 0.62)];
}

function stepToward(u, tx, ty, d) {
  const dx = tx - u.x;
  const dy = ty - u.y;
  const L = Math.hypot(dx, dy);
  if (L < 1e-6) return true;
  const want = Math.atan2(dy, dx);
  let diff = want - u.heading;
  while (diff > Math.PI) diff -= Math.PI * 2;
  while (diff < -Math.PI) diff += Math.PI * 2;
  u.heading += diff * Math.min(1, d * 0.08);
  if (L <= d) {
    u.x = tx;
    u.y = ty;
    return true;
  }
  u.x += (dx / L) * d;
  u.y += (dy / L) * d;
  return false;
}

export function unitSpeed(game, u, from, to) {
  let s = BASE_SPEED * UNIT_TYPES[u.type].speed * moveFactor(game, u, from, to);
  if (game.weather.type === 'rain') s *= 0.72;
  if (game.weather.type === 'fog') s *= 0.9;
  if (u.org < 0.3) s *= 0.85;
  if (u.routed) s *= 1.1;
  return s;
}

// Advance one unit along its path for `dt` hours.
export function updateMovement(game, u, dt) {
  const map = game.map;
  if (u.battle) {
    u.speedNow = 0;
    if (u.role === 'att') {
      const [ax, ay] = attackPoint(game, u, u.battle.cell);
      stepToward(u, ax, ay, BASE_SPEED * 0.6 * dt);
      const bc = map.cells[u.battle.cell];
      u.heading = Math.atan2(bc.y - u.y, bc.x - u.x);
    } else {
      const [rx, ry] = restPoint(game, u);
      stepToward(u, rx, ry, BASE_SPEED * 0.4 * dt);
      // face the strongest attacker
      const a = u.battle.attackers[0];
      if (a) u.heading = Math.atan2(a.y - u.y, a.x - u.x);
    }
    return;
  }
  if (!u.path.length) {
    u.moving = false;
    u.speedNow = 0;
    const [rx, ry] = restPoint(game, u);
    stepToward(u, rx, ry, BASE_SPEED * 0.5 * dt);
    return;
  }
  u.moving = true;
  const next = u.path[0];
  const e = map.edge(u.cell, next);
  if (!e) {
    // path became invalid (shouldn't happen) - stop
    setPath(game, u, []);
    return;
  }
  let speed = unitSpeed(game, u, u.cell, next);
  const dEdge = Math.hypot(e.mx - u.x, e.my - u.y);
  if (riverBlocked(game, e) && dEdge < 26) speed *= 0.3;
  u.speedNow = speed;
  let budget = speed * dt;

  // contact check: enemies holding the next cell?
  const enemies = game.enemiesInCell(u.side, next);
  if (enemies.length && !u.routed && game.aiSides.has(u.side) && !game.combat.battleAt(next)) {
    // AI battalions take a last look before committing: plain moves need good odds,
    // attacks call off hopeless assaults on a cell that has filled up with defenders
    const need = u.order.type === 'move' ? 1.2 : u.task?.kind === 'offensive' ? 0.55 : 0.75;
    if (!game.ai.goodOdds(u, next, need)) {
      setPath(game, u, []);
      u.order = { type: 'idle' };
      if (u.task && u.task.kind !== 'garrison') u.task.until = game.time;
      return;
    }
  }
  if (enemies.length && !u.routed && u.order.type === 'reinforce') {
    const t = game.unitById.get(u.order.unit);
    if (!t || !t.alive || !t.battle || t.battle.cell !== next) {
      // the fight we were joining is over: don't charge in alone
      setPath(game, u, []);
      game.orders.refresh(u);
      return;
    }
  }
  if (enemies.length && !u.routed) {
    const [ax, ay] = attackPoint(game, u, next);
    const reached = stepToward(u, ax, ay, budget);
    if (reached || Math.hypot(ax - u.x, ay - u.y) < 6) game.combat.startAttack(u, next);
    return;
  }
  if (enemies.length && u.routed) {
    // routed units try to find another way out
    game.orders.retreat(u, true);
    return;
  }
  const reached = stepToward(u, e.mx, e.my, budget);
  if (reached) {
    game.enterCell(u, next);
    u.path.shift();
    if (!u.path.length) assignSlot(game, u);
  }
}

// Out of combat recovery, entrenchment and medical support.
export function updateRecovery(game, u, dt) {
  if (u.battle) return;
  const map = game.map;
  const c = map.cells[u.cell];
  const loc = c.loc !== null ? map.locations[c.loc] : null;
  const friendlyLoc = loc && c.owner === u.side && !u.surrounded;
  const collapse = game.collapsing[u.side] ? (u.side === LEAF ? 0.85 : 0.5) : 1;
  if (!u.surrounded) {
    const boost = u.side === LEAF ? game.diff.playerHeal || 1 : 1;
    const orgRate = (u.moving ? 0.03 : 0.07) * (u.morale < 0.3 ? 0.6 : 1) * boost;
    u.org = Math.min(1, u.org + orgRate * dt);
    let mr = 0.006;
    if (friendlyLoc) mr += game.locMorale(loc);
    u.morale = Math.min(1, u.morale + mr * dt * collapse);
    if (friendlyLoc) u.soldiers = Math.min(u.max, u.soldiers + game.locHeal(loc) * dt);
  } else {
    u.morale = Math.max(0, u.morale - 0.007 * dt);
    u.org = Math.min(0.6, u.org + 0.01 * dt);
  }
  if (!u.moving) {
    // any halted battalion digs in a little; a DEFEND order digs in deep
    const cap = u.stance === 'defend' ? 1 : 0.45;
    if (u.entrench < cap) u.entrench = Math.min(cap, u.entrench + (u.stance === 'defend' ? 0.1 : 0.05) * dt);
  }
  if (u.routed && !u.moving && u.org > 0.3 && u.morale > 0.18) {
    u.routed = false;
    u.order = { type: 'idle' };
    game.emit('feed', { kind: u.side === LEAF ? 'info' : 'good', text: `${u.name} has regrouped`, unit: u });
  }
  if (u.routed && !u.moving && !u.path.length && game.time - (u.routedAt || 0) > 30) {
    // stuck routed unit regroups anyway
    u.routed = false;
    u.order = { type: 'idle' };
  }
  // medical battalions patch up nearby friends
  if (u.type === 'medical' && !u.moving) {
    for (const o of game.units) {
      if (!o.alive || o.side !== u.side || o === u) continue;
      if (Math.hypot(o.x - u.x, o.y - u.y) > WORLD.CELL * 1.8) continue;
      o.soldiers = Math.min(o.max, o.soldiers + 6 * dt);
      o.morale = Math.min(1, o.morale + 0.01 * dt);
      o.org = Math.min(1, o.org + 0.02 * dt);
    }
  }
}

export function clampStats(u) {
  u.morale = clamp(u.morale, 0, 1);
  u.org = clamp(u.org, 0, 1);
  u.soldiers = clamp(u.soldiers, 0, u.max);
}
