// The five orders: MOVE, ATTACK, DEFEND, RETREAT, REINFORCE.

import { findPath, setPath } from './units.js';
import { LEAF } from '../data/config.js';

export class Orders {
  constructor(game) {
    this.game = game;
  }

  canCommand(u) {
    return u.alive && !u.routed;
  }

  leaveBattle(u) {
    if (!u.battle) return;
    if (u.role === 'def') {
      u.org = Math.max(0, u.org - 0.08);
      u.soldiers *= 0.98;
    } else {
      u.org = Math.max(0, u.org - 0.03);
    }
    this.game.combat.removeUnit(u, 'withdraw');
  }

  move(u, cell, mode = 'move') {
    if (!this.canCommand(u)) return false;
    if (cell === u.cell && !u.battle) {
      setPath(this.game, u, []);
      u.order = { type: 'idle' };
      return true;
    }
    const path = findPath(this.game, u, cell, mode);
    if (!path) return false;
    this.leaveBattle(u);
    u.order = { type: 'move', cell };
    setPath(this.game, u, path);
    return true;
  }

  attack(u, target) {
    if (!this.canCommand(u)) return false;
    const game = this.game;
    const cell = target.unit ? target.unit.cell : target.cell;
    if (cell === u.cell) return false;
    if (u.battle && u.role === 'att' && u.battle.cell === cell) return true;
    const path = findPath(game, u, cell, 'attack');
    if (!path) return false;
    this.leaveBattle(u);
    u.order = { type: 'attack', unit: target.unit ? target.unit.id : null, cell };
    setPath(game, u, path);
    return true;
  }

  defend(u) {
    if (!this.canCommand(u)) return false;
    if (u.battle && u.role === 'att') this.leaveBattle(u);
    setPath(this.game, u, []);
    u.stance = 'defend';
    u.order = { type: 'defend' };
    return true;
  }

  // Find a safe friendly cell, preferring towns and forts away from the enemy.
  safeCell(u) {
    const game = this.game;
    const map = game.map;
    const enemies = game.units.filter((o) => o.alive && o.side !== u.side && !o.routed);
    const seen = new Map([[u.cell, 0]]);
    const queue = [u.cell];
    let best = null;
    let bestScore = Infinity;
    const supplied = game.supplied[u.side];
    while (queue.length) {
      const id = queue.shift();
      const d = seen.get(id);
      const c = map.cells[id];
      let ed = Infinity;
      for (const e of enemies) ed = Math.min(ed, Math.hypot(e.x - c.x, e.y - c.y));
      if (id !== u.cell && c.owner === u.side) {
        const loc = c.loc !== null ? map.locations[c.loc] : null;
        const strong = loc && loc.type !== 'village' && loc.type !== 'bridge';
        let score = d * 0.55 - Math.min(ed, 520) / 75 + (strong ? -2.5 : 0) + (supplied && !supplied[id] ? 6 : 0);
        if (ed < 150) score += 8;
        if (score < bestScore) {
          bestScore = score;
          best = id;
        }
      }
      if (d >= 14) continue;
      for (const nb of c.nbrs) {
        const cn = map.cells[nb];
        if (seen.has(nb) || !cn.passable) continue;
        if (cn.owner !== u.side) continue;
        if (game.enemiesInCell(u.side, nb).length) continue;
        seen.set(nb, d + 1);
        queue.push(nb);
      }
    }
    return best;
  }

  retreat(u, forced = false) {
    const game = this.game;
    if (!u.alive) return false;
    if (!forced && u.routed) return false;
    const dest = this.safeCell(u);
    const path = dest !== null ? findPath(game, u, dest, 'retreat') : null;
    if (u.battle) {
      if (!forced) this.leaveBattle(u);
      else game.combat.removeUnit(u, 'rout');
    }
    if (!path) {
      if (forced) {
        // cut off with nowhere to run
        game.destroyUnit(u, u.surrounded ? 'surrender' : 'destroyed');
        return false;
      }
      setPath(game, u, []);
      u.order = { type: 'idle' };
      return false;
    }
    u.order = { type: 'retreat', cell: dest };
    u.stance = 'normal';
    setPath(game, u, path);
    return true;
  }

  // Cell to head for when helping `t`.
  reinforceTarget(t) {
    if (t.battle) return { cell: t.battle.cell, mode: t.role === 'def' ? 'move' : 'attack' };
    return { cell: t.cell, mode: 'move' };
  }

  reinforce(u, t) {
    if (!this.canCommand(u) || !t || !t.alive || t === u || t.side !== u.side) return false;
    const game = this.game;
    const { cell, mode } = this.reinforceTarget(t);
    if (u.battle && u.battle === t.battle && u.role === t.role) return true;
    let path = [];
    if (cell !== u.cell) {
      path = findPath(game, u, cell, mode);
      if (!path) return false;
    }
    this.leaveBattle(u);
    u.order = { type: 'reinforce', unit: t.id, cell };
    setPath(game, u, path);
    if (u.side === LEAF && t.battle) {
      game.emit('feed', { kind: 'info', icon: '→', text: `${u.short} → ${t.short}: reinforcements on the way`, unit: u });
    }
    return true;
  }

  // Keep targeted orders up to date as the situation changes.
  refresh(u) {
    const game = this.game;
    const o = u.order;
    if (!u.alive || u.routed) return;
    if (o.type === 'attack' && o.unit) {
      const t = game.unitById.get(o.unit);
      if (!t || !t.alive || t.routed) {
        u.order = u.path.length ? { type: 'move', cell: o.cell } : { type: 'idle' };
        return;
      }
      if (!u.battle && t.cell !== o.cell) {
        const path = findPath(game, u, t.cell, 'attack');
        if (path) {
          o.cell = t.cell;
          setPath(game, u, path);
        }
      }
    } else if (o.type === 'reinforce') {
      const t = game.unitById.get(o.unit);
      if (!t || !t.alive) {
        u.order = { type: 'idle' };
        return;
      }
      if (u.battle) return;
      const want = this.reinforceTarget(t);
      if (want.cell !== o.cell || (!u.path.length && want.cell !== u.cell)) {
        if (want.cell === u.cell) {
          setPath(game, u, []);
        } else {
          const path = findPath(game, u, want.cell, want.mode);
          if (path) {
            o.cell = want.cell;
            setPath(game, u, path);
          }
        }
      } else if (!u.path.length && !t.battle && t.cell === u.cell) {
        u.order = { type: 'idle' };
      }
    } else if ((o.type === 'move' || o.type === 'attack' || o.type === 'retreat') && !u.path.length && !u.battle) {
      u.order = { type: 'idle' };
    }
  }
}
