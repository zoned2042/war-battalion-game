// Battles develop over time: strength, morale, organization, experience,
// terrain, generals and reinforcements all push the balance.

import { clamp } from '../core/util.js';
import { UNIT_TYPES, TERRAIN, LOCATION_TYPES, LEAF, STONE } from '../data/config.js';
import { unitLevel, clampStats, riverBlocked } from './units.js';

let nextBattleId = 1;

export class Combat {
  constructor(game) {
    this.game = game;
    this.battles = [];
  }

  battleAt(cell) {
    return this.battles.find((b) => b.cell === cell && !b.over) || null;
  }

  general(u) {
    const army = this.game.armies[u.army];
    if (!army || !army.general) return null;
    const g = this.game.generals[army.general];
    if (!g || g.woundedUntil > this.game.time) return null;
    return g;
  }

  terrainDefense(cellId) {
    const map = this.game.map;
    const c = map.cells[cellId];
    let d = TERRAIN[c.terrain].defense;
    if (c.loc !== null) d = Math.max(d, LOCATION_TYPES[map.locations[c.loc].type].defense);
    return d;
  }

  crossingMult(u, b) {
    const e = this.game.map.edge(u.cell, b.cell);
    if (!e || !e.river) return 1;
    return riverBlocked(this.game, e) ? 0.68 : 0.85;
  }

  power(u, role, b) {
    const game = this.game;
    const t = UNIT_TYPES[u.type];
    let p = u.soldiers * (role === 'att' ? t.atk : t.def) * unitLevel(u).mult;
    p *= 0.3 + 0.7 * u.org;
    p *= 0.45 + 0.55 * u.morale;
    const g = this.general(u);
    if (g) {
      if (g.trait === 'Aggressive' && role === 'att') p *= 1.2;
      if (g.trait === 'Defensive' && role === 'def') p *= 1.25;
      if (g.trait === 'Reckless' && role === 'att') p *= 1.15;
      if (g.trait === 'Strategist') {
        const side = role === 'att' ? b.attackers : b.defenders;
        const mates = side.filter((o) => o !== u && o.army === u.army).length;
        p *= 1 + 0.12 * Math.min(3, mates);
      }
    }
    if (u.surrounded) p *= 0.75;
    if (u.shakenUntil > game.time) p *= 0.85;
    if (game.collapsing[u.side]) p *= u.side === STONE ? 0.88 : 0.96;
    if (role === 'att') {
      if (u.order.type === 'attack') p *= 1.08;
      p *= this.crossingMult(u, b);
      if (game.weather.type === 'rain') p *= 0.88;
      if (game.weather.type === 'fog') p *= 0.92;
    } else {
      p *= 1 + 0.4 * u.entrench;
      if (u.stance === 'defend') p *= 1.1;
    }
    if (u.surprisedUntil > game.time) p *= 0.7;
    return p;
  }

  sidePower(b, role) {
    const list = role === 'att' ? b.attackers : b.defenders;
    let p = 0;
    for (const u of list) p += this.power(u, role, b);
    if (role === 'def') p *= this.terrainDefense(b.cell) * 1.1;
    return p;
  }

  // Unit `u` tries to push into `cell` held by the enemy.
  startAttack(u, cell) {
    const game = this.game;
    let b = this.battleAt(cell);
    if (u.battle && u.battle !== b) this.removeUnit(u, 'switch');
    if (b) {
      if (b.defenders.length && b.defenders[0].side === u.side) return; // friendly-held
      if (!b.attackers.includes(u)) {
        b.attackers.push(u);
        u.battle = b;
        u.role = 'att';
        u.moving = false;
        if (b.attackers.length > 1) {
          game.emit('feed', {
            kind: u.side === LEAF ? 'good' : 'bad',
            icon: '→',
            text: `Reinforcements arriving! ${u.short} joins the battle ${b.place}`,
            battle: b,
          });
          game.emit('float', { x: b.x, y: b.y, text: 'REINFORCEMENTS!', side: u.side });
        }
      }
      return;
    }
    const defenders = game.unitsInCell(cell).filter((o) => o.side !== u.side && !o.routed);
    if (!defenders.length) return;
    const place = game.map.placeName(game.map.cells[cell].x, game.map.cells[cell].y);
    b = {
      id: nextBattleId++,
      cell,
      x: game.map.cells[cell].x,
      y: game.map.cells[cell].y,
      attackers: [u],
      defenders: [],
      attSide: u.side,
      start: game.time,
      hours: 0,
      place,
      adv: 0.5,
      swingSeed: Math.random() * 100,
      nextRoll: game.time + 2.5,
      log: [],
      over: false,
      attStart: 0,
      defStart: 0,
      attLost: 0,
      defLost: 0,
    };
    this.battles.push(b);
    u.battle = b;
    u.role = 'att';
    u.moving = false;
    for (const d of defenders) {
      if (d.battle) {
        this.removeUnit(d, 'flanked');
        d.org = Math.max(0, d.org - 0.05);
        game.emit('feed', {
          kind: d.side === LEAF ? 'bad' : 'good',
          icon: '⚠',
          text: `${d.short} attacked from the flank!`,
          unit: d,
        });
      }
      b.defenders.push(d);
      d.battle = b;
      d.role = 'def';
    }
    b.attStart = u.soldiers;
    b.defStart = defenders.reduce((s, d) => s + d.soldiers, 0);
    game.emit('battleStart', b);
    const def = defenders[0];
    if (def.side === LEAF) {
      game.emit('feed', { kind: 'bad', icon: '⚔', text: `${def.short} is under attack ${place}!`, battle: b, alert: true });
    } else {
      game.emit('feed', { kind: 'info', icon: '⚔', text: `${u.short} attacks ${def.short} ${place}`, battle: b });
    }
  }

  addDefender(b, u) {
    if (b.defenders.includes(u)) return;
    if (u.battle) this.removeUnit(u, 'switch');
    b.defenders.push(u);
    u.battle = b;
    u.role = 'def';
    this.game.emit('feed', {
      kind: u.side === LEAF ? 'good' : 'bad',
      icon: '→',
      text: `Reinforcements arriving! ${u.short} joins the defense ${b.place}`,
      battle: b,
    });
    this.game.emit('float', { x: b.x, y: b.y, text: 'REINFORCEMENTS!', side: u.side });
  }

  removeUnit(u, reason) {
    const b = u.battle;
    if (!b) return;
    b.attackers = b.attackers.filter((o) => o !== u);
    b.defenders = b.defenders.filter((o) => o !== u);
    u.battle = null;
    u.role = null;
    if (reason === 'withdraw' || reason === 'rout') b.lastLeft = u;
  }

  log(b, text) {
    b.log.unshift({ t: this.game.time, text });
    if (b.log.length > 6) b.log.pop();
  }

  update(dt) {
    const game = this.game;
    for (const b of this.battles) {
      if (b.over) continue;
      b.attackers = b.attackers.filter((u) => u.alive && u.battle === b);
      b.defenders = b.defenders.filter((u) => u.alive && u.battle === b);
      if (!b.attackers.length || !b.defenders.length) {
        this.finish(b);
        continue;
      }
      b.hours += dt;
      const A0 = this.sidePower(b, 'att');
      const D0 = this.sidePower(b, 'def');
      // slow random swings so the fight ebbs and flows
      const swing = 0.16 * Math.sin(b.hours * 0.55 + b.swingSeed) + 0.08 * Math.sin(b.hours * 1.7 + b.swingSeed * 2);
      const A = A0 * (1 + swing);
      const D = D0 * (1 - swing);
      const f = clamp(A / Math.max(1, D), 0.2, 5);
      b.adv += (A / (A + D) - b.adv) * Math.min(1, dt * 0.8);
      b.ratio = f;

      const attMed = b.attackers.some((u) => u.type === 'medical');
      const defMed = b.defenders.some((u) => u.type === 'medical');
      const attHeavy = b.attackers.some((u) => u.type === 'heavy');
      const defHeavy = b.defenders.some((u) => u.type === 'heavy');
      const noise = () => 0.75 + Math.random() * 0.5;

      const defOrg = 0.024 * Math.pow(f, 0.85) * (attHeavy ? 1.12 : 1) * (defMed ? 0.9 : 1);
      const attOrg = 0.025 * Math.pow(1 / f, 0.85) * (defHeavy ? 1.1 : 1) * (attMed ? 0.9 : 1);
      const defCas = 0.0068 * Math.pow(f, 0.75) * (defMed ? 0.78 : 1);
      const attCas = 0.0075 * Math.pow(1 / f, 0.75) * (attMed ? 0.78 : 1);
      const defMor = 0.011 * Math.pow(f, 0.85);
      const attMor = 0.011 * Math.pow(1 / f, 0.85);

      const hit = (u, org, cas, mor) => {
        const g = this.general(u);
        let casM = 1;
        let morM = 1;
        if (g && g.trait === 'Reckless') {
          casM = 1.15;
          morM = 0.6;
        }
        const before = u.soldiers;
        u.org -= org * dt * noise();
        u.soldiers -= u.soldiers * cas * dt * noise() * casM;
        u.morale -= mor * dt * noise() * morM * (u.org < 0.3 ? 1.5 : 1);
        u.xp += 0.5 * dt;
        clampStats(u);
        return before - u.soldiers;
      };
      let lostA = 0;
      let lostD = 0;
      for (const u of b.attackers) lostA += hit(u, attOrg, attCas, attMor);
      for (const u of b.defenders) lostD += hit(u, defOrg, defCas, defMor);
      b.attLost += lostA;
      b.defLost += lostD;
      b.pendingA = (b.pendingA || 0) + lostA;
      b.pendingD = (b.pendingD || 0) + lostD;
      if (b.pendingA > 25 || b.pendingD > 25) {
        game.emit('casualties', { b, a: Math.round(b.pendingA), d: Math.round(b.pendingD) });
        b.pendingA = 0;
        b.pendingD = 0;
      }

      // morale warnings
      for (const u of [...b.attackers, ...b.defenders]) {
        if (u.morale < 0.35 && !u.warnedMorale) {
          u.warnedMorale = true;
          game.emit('feed', {
            kind: u.side === LEAF ? 'bad' : 'good',
            icon: '⚠',
            text: `${u.short} is losing morale!`,
            battle: b,
          });
          this.log(b, `${u.short} is wavering`);
        }
        if (u.morale > 0.5) u.warnedMorale = false;
      }

      if (game.time >= b.nextRoll) {
        b.nextRoll = game.time + 2 + Math.random() * 2.5;
        this.rollBattleEvent(b, f);
      }

      // breaking point
      for (const u of [...b.attackers, ...b.defenders]) {
        if (u.soldiers < Math.max(25, u.max * 0.06)) {
          game.destroyUnit(u, 'destroyed');
        } else if (u.org <= 0.03 || u.morale <= 0.03) {
          this.breakUnit(u, b);
        }
      }
      b.attackers = b.attackers.filter((u) => u.alive && u.battle === b);
      b.defenders = b.defenders.filter((u) => u.alive && u.battle === b);
      if (!b.attackers.length || !b.defenders.length) this.finish(b);
    }
    this.battles = this.battles.filter((b) => !b.over || game.time - b.endTime < 4);
  }

  rollBattleEvent(b, f) {
    const game = this.game;
    const r = Math.random();
    const att = b.attackers[Math.floor(Math.random() * b.attackers.length)];
    const def = b.defenders[Math.floor(Math.random() * b.defenders.length)];
    if (!att || !def) return;
    if (b.adv > 0.6 && r < 0.32) {
      for (const d of b.defenders) {
        d.org = Math.max(0, d.org - 0.08);
        d.morale = Math.max(0, d.morale - 0.03);
      }
      const text = `${att.short} breaks through!`;
      this.log(b, text);
      game.emit('feed', { kind: att.side === LEAF ? 'good' : 'bad', icon: '⚔', text, battle: b });
      game.emit('float', { x: b.x, y: b.y, text: 'BREAKTHROUGH!', side: att.side });
      game.emit('burst', { x: b.x, y: b.y, n: 3 });
    } else if (b.adv < 0.4 && r < 0.3) {
      for (const a of b.attackers) a.org = Math.max(0, a.org - 0.06);
      const text = `${def.short} holds the line!`;
      this.log(b, text);
      game.emit('feed', { kind: def.side === LEAF ? 'good' : 'bad', icon: '🛡', text, battle: b });
      game.emit('float', { x: b.x, y: b.y, text: 'HOLDING!', side: def.side });
    } else if (r < 0.06) {
      const victim = Math.random() < 0.5 ? att : def;
      victim.morale = Math.max(0, victim.morale - 0.12);
      victim.org = Math.max(0, victim.org - 0.05);
      const enemyOfPlayer = victim.side === STONE;
      const text = enemyOfPlayer
        ? `Enemy commander wounded! (${victim.short})`
        : `Captain ${victim.captain} of ${victim.short} wounded!`;
      this.log(b, text);
      game.emit('feed', { kind: enemyOfPlayer ? 'good' : 'bad', icon: '★', text, battle: b });
      game.emit('float', { x: b.x, y: b.y, text: 'COMMANDER WOUNDED', side: 1 - victim.side });
    } else if (r < 0.45) {
      const flavor = [
        `${att.short} presses the assault`,
        `Heavy fighting ${b.place}`,
        `${def.short} counterattacks`,
        `Casualties mounting on both sides`,
        `${att.short} gains ground`,
      ];
      this.log(b, flavor[Math.floor(Math.random() * flavor.length)]);
    }
  }

  breakUnit(u, b) {
    const game = this.game;
    u.morale = Math.max(0, u.morale - 0.05);
    u.routed = true;
    u.routedAt = game.time;
    u.stats.lost++;
    const mine = u.side === LEAF;
    game.emit('feed', { kind: mine ? 'bad' : 'good', icon: '⚠', text: `${u.short} forced to retreat!`, battle: b, unit: u });
    game.emit('float', { x: u.x, y: u.y, text: 'RETREATING', side: 1 - u.side });
    this.log(b, `${u.short} breaks and retreats`);
    game.orders.retreat(u, true);
  }

  finish(b) {
    const game = this.game;
    if (b.over) return;
    b.over = true;
    b.endTime = game.time;
    const attWon = b.attackers.length > 0 && b.defenders.length === 0;
    b.winner = attWon ? b.attSide : 1 - b.attSide;
    const winners = attWon ? b.attackers : b.defenders;
    for (const u of winners) {
      u.morale = Math.min(1, u.morale + 0.07);
      u.xp += 3;
      u.stats.won++;
    }
    for (const u of [...b.attackers, ...b.defenders]) {
      u.battle = null;
      u.role = null;
    }
    const mine = b.winner === LEAF;
    if (attWon) {
      // the strongest attacker advances into the cell
      const cellHasEnemy = game.enemiesInCell(b.attSide, b.cell).length > 0;
      if (!cellHasEnemy) {
        const lead = [...b.attackers].sort((a, c) => c.org * c.soldiers - a.org * a.soldiers)[0];
        if (lead && !lead.path.length) lead.path = [b.cell];
        if (lead && lead.path[0] !== b.cell && game.map.edge(lead.cell, b.cell)) lead.path.unshift(b.cell);
        if (lead) lead.moving = true;
      }
      const text = mine ? `Enemy position ${b.place} captured!` : `Our position ${b.place} has fallen!`;
      game.emit('feed', { kind: mine ? 'good' : 'bad', icon: '⚔', text, battle: b });
      game.emit('float', { x: b.x, y: b.y, text: mine ? 'POSITION TAKEN!' : 'POSITION LOST', side: b.winner });
    } else {
      const text = mine ? `Enemy attack repulsed ${b.place}!` : `Our attack ${b.place} was repulsed`;
      game.emit('feed', { kind: mine ? 'good' : 'bad', icon: '🛡', text, battle: b });
      game.emit('float', { x: b.x, y: b.y, text: mine ? 'ATTACK REPULSED!' : 'ATTACK FAILED', side: b.winner });
    }
    game.stats.battles++;
    if (mine) game.stats.battlesWon++;
    game.emit('battleEnd', b);
  }

  // Display helper: who is winning, totals, reinforcements en route.
  summary(b) {
    const game = this.game;
    const sum = (list, f) => list.reduce((s, u) => s + f(u), 0);
    const avg = (list, f) => (list.length ? sum(list, f) / list.length : 0);
    const incoming = game.units.filter((u) => {
      if (!u.alive || u.battle || u.order.type !== 'reinforce') return false;
      const t = game.unitById.get(u.order.unit);
      return t && t.battle === b;
    });
    const incomingAtt = game.units.filter(
      (u) => u.alive && !u.battle && u.order.type === 'attack' && u.order.cell === b.cell && u.side === b.attSide,
    );
    return {
      attSoldiers: sum(b.attackers, (u) => u.soldiers),
      defSoldiers: sum(b.defenders, (u) => u.soldiers),
      attMorale: avg(b.attackers, (u) => u.morale),
      defMorale: avg(b.defenders, (u) => u.morale),
      attOrg: avg(b.attackers, (u) => u.org),
      defOrg: avg(b.defenders, (u) => u.org),
      terrain: this.terrainDefense(b.cell),
      incoming: [...new Set([...incoming, ...incomingAtt])],
    };
  }
}
