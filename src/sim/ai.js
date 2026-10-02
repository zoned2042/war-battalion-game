// Enemy commander. Keeps every battalion busy: holding the line, defending key
// places, hunting weak battalions, reinforcing fights, counterattacking and
// launching breakthrough attempts.

import { STONE, WORLD, CAPITAL } from '../data/config.js';
import { strengthFrac } from './units.js';

export class EnemyAI {
  constructor(game, side = STONE) {
    this.game = game;
    this.side = side;
    this.nextThink = 2;
    this.nextOffensive = 20 + Math.random() * 10;
    this.offensive = null; // { target, units: [], until }
    this.lostCells = []; // recently lost important cells -> counterattack
    game.on('siege', ({ cell, side }) => {
      if (side !== this.side) this.lostCells.push({ cell, t: game.time });
    });
    game.on('captured', ({ cell, side }) => {
      if (side === this.side) return;
      const c = game.map.cells[cell];
      if (c.loc !== null && game.map.locations[c.loc].type !== 'village') this.lostCells.push({ cell, t: game.time });
    });
  }

  myUnits() {
    return this.game.units.filter((u) => u.alive && u.side === this.side);
  }

  enemyUnits() {
    return this.game.units.filter((u) => u.alive && u.side !== this.side);
  }

  power(u) {
    return u.soldiers * (0.3 + 0.7 * u.org) * (0.45 + 0.55 * u.morale);
  }

  // Would `u` likely win pushing into `cell` right now?
  goodOdds(u, cell, need = 1.2) {
    const game = this.game;
    const foes = game.enemiesInCell(u.side, cell);
    const fp = foes.reduce((s, f) => s + this.power(f) * (1 + 0.4 * f.entrench), 0) * game.combat.terrainDefense(cell);
    // count friends already heading into the same cell
    let mine = this.power(u);
    for (const o of game.units) {
      if (o === u || !o.alive || o.side !== u.side || o.routed) continue;
      if (o.battle && o.battle.cell === cell) mine += this.power(o);
    }
    return mine * this.aggression(u) > fp * need;
  }

  aggression(u) {
    const g = this.game.combat.general(u);
    let a = this.game.diff.aiAggro;
    if (g?.trait === 'Aggressive') a *= 1.25;
    if (g?.trait === 'Reckless') a *= 1.5;
    if (g?.trait === 'Defensive') a *= 0.8;
    if (this.game.collapsing[this.side]) a *= 0.7;
    return a;
  }

  free(u) {
    return !u.battle && !u.routed && (!u.task || u.task.kind === 'hold' || this.game.time > u.task.until);
  }

  assign(u, task, hours) {
    u.task = { ...task, until: this.game.time + hours };
  }

  frontCells() {
    const map = this.game.map;
    return map.cells.filter(
      (c) => c.owner === this.side && c.passable && c.nbrs.some((n) => map.cells[n].owner === 1 - this.side),
    );
  }

  update() {
    const game = this.game;
    if (game.time < this.nextThink) return;
    this.nextThink = game.time + game.diff.aiThink * (0.8 + Math.random() * 0.4);
    const mine = this.myUnits();
    const foes = this.enemyUnits();
    const orders = game.orders;
    const map = game.map;
    const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

    // 1. battered battalions fall back to recover
    for (const u of mine) {
      if (u.battle || u.routed) continue;
      const weak = strengthFrac(u) < 0.35 || u.morale < 0.25 || u.org < 0.2;
      if (weak && u.task?.kind !== 'recover') {
        if (orders.retreat(u)) this.assign(u, { kind: 'recover' }, 30);
      }
      if (u.task?.kind === 'recover' && strengthFrac(u) > 0.6 && u.morale > 0.5 && u.org > 0.7) u.task = null;
    }

    // 2. keep the capital garrisoned
    const cap = map.locByKey[CAPITAL[this.side]];
    if (cap.owner === this.side) {
      const guards = mine.filter((u) => u.task?.kind === 'garrison' && u.task.cell === cap.cell);
      const threat = foes.filter((f) => dist(f, cap) < 420).length;
      const want = threat ? 2 : 1;
      if (guards.length < want) {
        const cand = mine
          .filter((u) => this.free(u) && u.task?.kind !== 'recover' && u.type !== 'scout')
          .sort((a, b) => dist(a, cap) - dist(b, cap))[0];
        if (cand && orders.move(cand, cap.cell)) this.assign(cand, { kind: 'garrison', cell: cap.cell }, 1e9);
      }
      for (const g of guards) {
        if (!g.battle && g.cell !== cap.cell && !g.path.length) orders.move(g, cap.cell);
        else if (!g.moving && !g.battle && g.stance !== 'defend' && g.cell === cap.cell) orders.defend(g);
      }
    }

    // 3. reinforce losing battles
    for (const b of game.combat.battles) {
      if (b.over) continue;
      const weAttack = b.attSide === this.side;
      const ours = weAttack ? b.attackers : b.defenders;
      if (!ours.length) continue;
      const ourShare = weAttack ? b.adv : 1 - b.adv;
      const helpers = mine.filter((u) => u.task?.kind === 'reinforce' && u.task.battle === b.id);
      if (ourShare < 0.55 && helpers.length < 2) {
        const cand = mine
          .filter(
            (u) =>
              this.free(u) &&
              u.task?.kind !== 'recover' &&
              u.task?.kind !== 'garrison' &&
              u.type !== 'medical' &&
              strengthFrac(u) > 0.45,
          )
          .filter((u) => dist(u, b) < WORLD.CELL * 7)
          .sort((a, c) => dist(a, b) - dist(c, b))[0];
        if (cand && orders.reinforce(cand, ours[0])) this.assign(cand, { kind: 'reinforce', battle: b.id }, 20);
      }
      // reckless or losing badly: pull out units about to break
      for (const u of ours) {
        if (u.org < 0.1 && ourShare < 0.3 && this.game.combat.general(u)?.trait !== 'Reckless' && Math.random() < 0.5) {
          if (orders.retreat(u)) this.assign(u, { kind: 'recover' }, 24);
        }
      }
    }

    // 4. counterattack recently lost towns and forts
    this.lostCells = this.lostCells.filter(
      (l) => game.time - l.t < 40 && (map.cells[l.cell].owner !== this.side || game.sieges.has(l.cell)),
    );
    for (const lost of this.lostCells) {
      const c = map.cells[lost.cell];
      const already = mine.filter((u) => u.task?.kind === 'counter' && u.task.cell === lost.cell).length;
      if (already >= 2) continue;
      const holders = game.unitsInCell(lost.cell).filter((u) => u.side !== this.side);
      const holdP = holders.reduce((s, u) => s + this.power(u), 0);
      const cand = mine
        .filter(
          (u) =>
            this.free(u) &&
            u.task?.kind !== 'recover' &&
            u.task?.kind !== 'garrison' &&
            u.type !== 'medical' &&
            strengthFrac(u) > 0.5,
        )
        .filter((u) => dist(u, c) < WORLD.CELL * 9)
        .sort((a, b) => dist(a, c) - dist(b, c))
        .slice(0, 2 - already);
      const ourP = cand.reduce((s, u) => s + this.power(u), 0);
      if (cand.length && ourP * this.aggression(cand[0]) > holdP * 0.8) {
        for (const u of cand) {
          if (orders.attack(u, { cell: lost.cell })) this.assign(u, { kind: 'counter', cell: lost.cell }, 24);
        }
        if (holders.length) {
          game.emit('feed', {
            kind: 'bad',
            icon: '⚠',
            text: `Enemy counterattack ${game.map.placeName(c.x, c.y)}!`,
            cell: lost.cell,
            alert: true,
          });
        }
      }
    }

    // 5. hunt weak or isolated battalions near the front
    for (const f of foes) {
      if (f.routed) continue;
      const fp = this.power(f) * (f.battle ? 0.7 : 1) * game.combat.terrainDefense(f.cell);
      const weakish =
        strengthFrac(f) < 0.55 || f.morale < 0.4 || f.surrounded || f.type === 'medical' || f.type === 'scout';
      if (!weakish) continue;
      const hunters = mine.filter((u) => u.task?.kind === 'hunt' && u.task.target === f.id);
      if (hunters.length) continue;
      const cand = mine
        .filter(
          (u) =>
            this.free(u) &&
            !['recover', 'garrison', 'reinforce'].includes(u.task?.kind) &&
            u.type !== 'medical' &&
            strengthFrac(u) > 0.55,
        )
        .filter((u) => dist(u, f) < WORLD.CELL * 6)
        .sort((a, b) => dist(a, f) - dist(b, f))[0];
      if (!cand) continue;
      if (this.power(cand) * this.aggression(cand) > fp * 1.3) {
        if (orders.attack(cand, { unit: f })) this.assign(cand, { kind: 'hunt', target: f.id }, 18);
      }
    }

    // 6. breakthrough offensives
    this.updateOffensive(mine, foes);

    // 7. everyone else holds the line, probing where the odds are good
    this.holdLine(mine, foes);
  }

  updateOffensive(mine, foes) {
    const game = this.game;
    const map = game.map;
    const orders = game.orders;
    if (this.offensive) {
      const off = this.offensive;
      off.units = off.units.filter((u) => u.alive && u.task?.kind === 'offensive');
      if (game.time > off.until || !off.units.length || map.cells[off.target.cell].owner === this.side) {
        for (const u of off.units) u.task = null;
        this.offensive = null;
      } else {
        for (const u of off.units) {
          if (!u.battle && !u.path.length && !u.routed) orders.attack(u, { cell: off.target.cell });
        }
      }
      return;
    }
    if (game.time < this.nextOffensive || game.collapsing[this.side]) return;
    this.nextOffensive = game.time + (34 + Math.random() * 24) / game.diff.aiAggro;
    // pick a target: enemy town/fort/objective near the front where defenders are thin
    const objectives = game.objectives[this.side];
    const targets = map.locations.filter((l) => l.owner === 1 - this.side && l.type !== 'village');
    let best = null;
    let bestScore = -Infinity;
    const front = this.frontCells();
    for (const t of targets) {
      let fd = Infinity;
      for (const c of front) fd = Math.min(fd, Math.hypot(c.x - t.x, c.y - t.y));
      const defenders = foes.filter((f) => Math.hypot(f.x - t.x, f.y - t.y) < WORLD.CELL * 3.5);
      const defP = defenders.reduce((s, f) => s + this.power(f), 0);
      const score = (objectives.includes(t.key) ? 700 : 300) - fd * 1.4 - defP * 0.5 + Math.random() * 200;
      if (score > bestScore) {
        bestScore = score;
        best = t;
      }
    }
    if (!best) return;
    const group = mine
      .filter(
        (u) =>
          this.free(u) &&
          !['recover', 'garrison'].includes(u.task?.kind) &&
          u.type !== 'medical' &&
          strengthFrac(u) > 0.6 &&
          u.org > 0.6,
      )
      .sort((a, b) => Math.hypot(a.x - best.x, a.y - best.y) - Math.hypot(b.x - best.x, b.y - best.y))
      .slice(0, 3);
    if (group.length < 2) return;
    this.offensive = { target: best, units: group, until: game.time + 60 };
    for (const u of group) {
      if (game.orders.attack(u, { cell: best.cell })) this.assign(u, { kind: 'offensive' }, 60);
    }
    game.emit('feed', {
      kind: 'bad',
      icon: '⚠',
      text: `Enemy breakthrough attempt toward ${best.name}!`,
      cell: best.cell,
      alert: true,
    });
    game.emit('banner', { text: 'ENEMY OFFENSIVE', sub: `Stone forces are pushing toward ${best.name}`, kind: 'bad' });
  }

  holdLine(mine, foes) {
    const game = this.game;
    const map = game.map;
    const orders = game.orders;
    const holders = mine.filter(
      (u) =>
        !u.battle &&
        !u.routed &&
        (!u.task || u.task.kind === 'hold' || game.time > u.task.until) &&
        u.task?.kind !== 'garrison' &&
        u.task?.kind !== 'recover',
    );
    if (!holders.length) return;
    const front = this.frontCells();
    if (!front.length) return;
    // split the front into horizontal bands, one per holder
    const n = holders.length;
    const bandH = WORLD.H / n;
    const sorted = holders.slice().sort((a, b) => a.y - b.y);
    for (let i = 0; i < n; i++) {
      const u = sorted[i];
      if (u.type === 'medical') {
        // medics sit behind the busiest part of the line
        const busiest = mine.filter((m) => m.battle).sort((a, b) => a.org - b.org)[0];
        if (busiest && !u.path.length) {
          const tgt = this.behind(busiest.cell, 2);
          if (tgt !== null && tgt !== u.cell) orders.move(u, tgt);
        }
        u.task = { kind: 'hold', until: game.time + 10 };
        continue;
      }
      const y0 = i * bandH;
      const y1 = y0 + bandH;
      const band = front.filter((c) => c.y >= y0 - 20 && c.y < y1 + 20);
      const pool = band.length ? band : front;
      const cy = (y0 + y1) / 2;
      // prefer defensible ground near the band center
      let best = null;
      let bs = Infinity;
      for (const c of pool) {
        const def = game.combat.terrainDefense(c.id);
        const s = Math.abs(c.y - cy) - def * 60 + Math.hypot(c.x - u.x, c.y - u.y) * 0.15;
        if (s < bs) {
          bs = s;
          best = c;
        }
      }
      if (!best) continue;
      // probe: attack an adjacent weak enemy if odds look good
      const adjacentFoes = foes.filter((f) => !f.routed && Math.hypot(f.x - u.x, f.y - u.y) < WORLD.CELL * 2.2);
      const prey = adjacentFoes.sort((a, b) => this.power(a) - this.power(b))[0];
      if (prey) {
        const odds = (this.power(u) * this.aggression(u)) / (this.power(prey) * game.combat.terrainDefense(prey.cell));
        if (odds > 1.4 || (odds > 0.95 && Math.random() < 0.1 * this.aggression(u))) {
          if (orders.attack(u, { unit: prey })) {
            this.assign(u, { kind: 'probe', target: prey.id }, 14);
            continue;
          }
        }
      }
      // push into empty enemy cells next to the line
      if (!adjacentFoes.length && Math.random() < 0.3 * this.aggression(u)) {
        const enemyAdj = map.cells[u.cell].nbrs
          .map((id) => map.cells[id])
          .filter((c) => c.passable && c.owner !== this.side && !game.enemiesInCell(this.side, c.id).length);
        if (enemyAdj.length) {
          const tgt = enemyAdj[Math.floor(Math.random() * enemyAdj.length)];
          if (orders.move(u, tgt.id)) {
            this.assign(u, { kind: 'probe' }, 8);
            continue;
          }
        }
      }
      if (u.cell !== best.id && (!u.path.length || u.order.cell !== best.id)) {
        if (Math.hypot(best.x - u.x, best.y - u.y) > WORLD.CELL * 0.8) orders.move(u, best.id);
      } else if (!u.moving && u.stance !== 'defend') {
        orders.defend(u);
      }
      u.task = { kind: 'hold', until: game.time + 8 };
    }
  }

  // A friendly cell `steps` away from the front behind `cellId`.
  behind(cellId, steps) {
    const map = this.game.map;
    let cur = cellId;
    for (let s = 0; s < steps; s++) {
      const c = map.cells[cur];
      let best = null;
      let bs = -Infinity;
      for (const nb of c.nbrs) {
        const cn = map.cells[nb];
        if (!cn.passable || cn.owner !== this.side) continue;
        const score = this.side === STONE ? cn.x - c.x : c.x - cn.x;
        if (score > bs) {
          bs = score;
          best = nb;
        }
      }
      if (best === null) break;
      cur = best;
    }
    return cur;
  }
}
