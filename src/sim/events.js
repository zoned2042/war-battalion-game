// Battlefield events: weather, artillery, reinforcements, wounded generals,
// blown bridges, surprise attacks and morale collapses.

import { LEAF, STONE, WORLD, CAPITAL, REINFORCEMENT_NAMES } from '../data/config.js';
import { strengthFrac } from './units.js';

export class BattlefieldEvents {
  constructor(game) {
    this.game = game;
    this.next = 16 + Math.random() * 8;
    this.barrages = [];
    this.nextReinf = { [LEAF]: 54, [STONE]: 54 / game.diff.enemyReinf };
    this.reinfIdx = { [LEAF]: 0, [STONE]: 0 };
  }

  update(dt) {
    const game = this.game;
    const w = game.weather;
    if (w.type !== 'clear' && game.time > w.until) {
      game.emit('feed', { kind: 'info', icon: '☀', text: 'The weather clears' });
      game.weather = { type: 'clear', until: Infinity };
    }
    this.updateBarrages();
    for (const side of [LEAF, STONE]) {
      if (game.time >= this.nextReinf[side]) {
        this.nextReinf[side] =
          game.time + (side === LEAF ? 62 : 62 / game.diff.enemyReinf) * (0.85 + Math.random() * 0.3);
        this.spawnReinforcement(side);
      }
    }
    if (game.time < this.next) return;
    this.next = game.time + 24 + Math.random() * 22;
    const options = [
      ['rain', w.type === 'clear' ? 1 : 0],
      ['fog', w.type === 'clear' ? 0.9 : 0],
      ['artillery', 1.5],
      ['topup', 1],
      ['general', 0.6],
      ['bridge', 0.7],
      ['surprise', 1 * game.diff.aiAggro],
      ['collapse', game.combat.battles.some((b) => !b.over) ? 0.8 : 0],
      ['breakthrough', 0.6 * game.diff.aiAggro],
    ];
    const total = options.reduce((s, o) => s + o[1], 0);
    let r = Math.random() * total;
    for (const [kind, wgt] of options) {
      r -= wgt;
      if (r <= 0) {
        this.fire(kind);
        break;
      }
    }
  }

  fire(kind) {
    const game = this.game;
    switch (kind) {
      case 'rain':
        game.weather = { type: 'rain', until: game.time + 10 + Math.random() * 10 };
        game.emit('banner', { text: 'HEAVY RAIN', sub: 'Movement slowed, attacks weakened', kind: 'info' });
        game.emit('feed', { kind: 'info', icon: '🌧', text: 'Heavy rain: movement −28%, attacks −12%' });
        break;
      case 'fog':
        game.weather = { type: 'fog', until: game.time + 8 + Math.random() * 8 };
        game.emit('banner', { text: 'FOG ROLLS IN', sub: 'Enemy positions hard to see', kind: 'info' });
        game.emit('feed', { kind: 'info', icon: '🌫', text: 'Fog: distant enemy battalions are hidden' });
        break;
      case 'artillery':
        this.artillery();
        break;
      case 'topup':
        this.topUp(Math.random() < 0.5 ? LEAF : STONE);
        break;
      case 'general':
        this.woundGeneral();
        break;
      case 'bridge':
        this.blowBridge();
        break;
      case 'surprise':
        this.surpriseAttack();
        break;
      case 'collapse':
        this.moraleCollapse();
        break;
      case 'breakthrough':
        game.ai.nextOffensive = game.time;
        break;
      default:
        break;
    }
  }

  frontDistance(x, y) {
    const lines = this.game.territory.frontLines();
    let best = Infinity;
    for (const l of lines) {
      for (let i = 0; i < l.pts.length; i += 3) {
        const p = l.pts[i];
        best = Math.min(best, Math.hypot(p[0] - x, p[1] - y));
      }
    }
    return best;
  }

  artillery() {
    const game = this.game;
    const side = Math.random() < 0.5 ? LEAF : STONE;
    const targets = game.units.filter(
      (u) => u.alive && u.side !== side && !u.routed && this.frontDistance(u.x, u.y) < WORLD.CELL * 3,
    );
    if (!targets.length) return;
    const t = targets[Math.floor(Math.random() * targets.length)];
    this.barrages.push({ side, target: t, shells: 9 + Math.floor(Math.random() * 6), next: game.time });
    const mine = side === LEAF;
    game.emit('feed', {
      kind: mine ? 'good' : 'bad',
      icon: '💥',
      text: mine ? `Our artillery pounds ${t.short}!` : `Artillery barrage hits ${t.short}!`,
      unit: t,
      alert: !mine,
    });
    game.emit('float', { x: t.x, y: t.y, text: 'ARTILLERY BARRAGE', side });
  }

  updateBarrages() {
    const game = this.game;
    for (const br of this.barrages) {
      if (game.time < br.next) continue;
      br.next = game.time + 0.18 + Math.random() * 0.25;
      br.shells--;
      const t = br.target;
      const x = t.x + (Math.random() - 0.5) * 80;
      const y = t.y + (Math.random() - 0.5) * 80;
      game.emit('shell', { x, y });
      if (t.alive && Math.hypot(t.x - x, t.y - y) < 46) {
        t.soldiers = Math.max(1, t.soldiers - (8 + Math.random() * 14) * (1 - t.entrench * 0.5));
        t.org = Math.max(0, t.org - 0.035);
        t.morale = Math.max(0, t.morale - 0.012);
      }
    }
    this.barrages = this.barrages.filter((b) => b.shells > 0);
  }

  spawnReinforcement(side) {
    const game = this.game;
    const alive = game.units.filter((u) => u.alive && u.side === side).length;
    const cap = side === LEAF ? 18 : 22;
    const list = REINFORCEMENT_NAMES[side];
    if (alive >= cap || this.reinfIdx[side] >= list.length) {
      this.topUp(side);
      return;
    }
    const map = game.map;
    let loc = map.locByKey[CAPITAL[side]];
    if (loc.owner !== side) {
      loc = map.locations.find((l) => l.owner === side && (l.type === 'city' || l.type === 'fort'));
      if (!loc) return;
    }
    const [name, short, type] = list[this.reinfIdx[side]++];
    const army = Object.values(game.armies).find((a) => a.side === side);
    const u = game.addUnit({ side, name, short, type, cell: loc.cell, army: army.id, xp: 2 });
    u.morale = 0.85;
    const mine = side === LEAF;
    game.emit('feed', {
      kind: mine ? 'good' : 'bad',
      icon: '→',
      text: mine ? `Reinforcements arrive: ${name} at ${loc.name}` : `Enemy reinforcements spotted at ${loc.name}`,
      unit: u,
    });
    if (mine)
      game.emit('banner', { text: 'REINFORCEMENTS ARRIVE', sub: `${name} is ready at ${loc.name}`, kind: 'good' });
  }

  topUp(side) {
    const game = this.game;
    const weak = game.units
      .filter((u) => u.alive && u.side === side && !u.battle)
      .sort((a, b) => strengthFrac(a) - strengthFrac(b))
      .slice(0, 3);
    if (!weak.length) return;
    for (const u of weak) {
      u.soldiers = Math.min(u.max, u.soldiers + u.max * 0.22);
      u.morale = Math.min(1, u.morale + 0.08);
    }
    const mine = side === LEAF;
    game.emit('feed', {
      kind: mine ? 'good' : 'bad',
      icon: '→',
      text: mine
        ? `Replacements arrive for ${weak.map((u) => u.short).join(', ')}`
        : `Enemy battalions receive fresh replacements`,
    });
  }

  woundGeneral() {
    const game = this.game;
    const armies = Object.values(game.armies).filter(
      (a) => a.general && game.generals[a.general].woundedUntil < game.time,
    );
    if (!armies.length) return;
    const a = armies[Math.floor(Math.random() * armies.length)];
    const g = game.generals[a.general];
    g.woundedUntil = game.time + 30 + Math.random() * 20;
    for (const u of game.units) if (u.alive && u.army === a.id) u.morale = Math.max(0, u.morale - 0.08);
    const mine = a.side === LEAF;
    game.emit('feed', {
      kind: mine ? 'bad' : 'good',
      icon: '★',
      text: mine
        ? `General ${g.name} wounded! ${a.name} loses the ${g.trait} bonus`
        : `Enemy General ${g.name} wounded! ${a.name} in disarray`,
    });
    game.emit('banner', {
      text: mine ? 'GENERAL WOUNDED' : 'ENEMY GENERAL WOUNDED',
      sub: `${g.name} (${a.name}) is out of action`,
      kind: mine ? 'bad' : 'good',
    });
  }

  blowBridge() {
    const game = this.game;
    const cand = game.map.bridges.filter(
      (b) => b.destroyedUntil < game.time && this.frontDistance(b.x, b.y) < WORLD.CELL * 5,
    );
    if (!cand.length) return;
    const br = cand[Math.floor(Math.random() * cand.length)];
    br.destroyedUntil = game.time + 40 + Math.random() * 20;
    const place = game.map.placeName(br.x, br.y);
    game.emit('bridge', { bridge: br, destroyed: true });
    game.emit('explosion', { x: br.x, y: br.y, big: true });
    game.emit('feed', {
      kind: 'info',
      icon: '💥',
      text: `Bridge ${place} destroyed! Crossing is slow and costly`,
      x: br.x,
      y: br.y,
    });
    game.emit('banner', { text: 'BRIDGE DESTROYED', sub: `The crossing ${place} is down`, kind: 'info' });
  }

  surpriseAttack() {
    const game = this.game;
    const attackers = game.units.filter(
      (u) =>
        u.alive && u.side === STONE && !u.battle && !u.routed && strengthFrac(u) > 0.6 && u.task?.kind !== 'garrison',
    );
    for (const a of attackers.sort(() => Math.random() - 0.5)) {
      const t = game.units.find(
        (v) =>
          v.alive && v.side === LEAF && !v.battle && !v.routed && Math.hypot(v.x - a.x, v.y - a.y) < WORLD.CELL * 2.6,
      );
      if (!t) continue;
      if (!game.orders.attack(a, { unit: t })) continue;
      a.task = { kind: 'hunt', target: t.id, until: game.time + 16 };
      t.surprisedUntil = game.time + 5;
      t.org = Math.max(0, t.org - 0.12);
      game.emit('feed', {
        kind: 'bad',
        icon: '⚠',
        text: `Surprise attack! ${a.short} ambushes ${t.short}!`,
        unit: t,
        alert: true,
      });
      game.emit('float', { x: t.x, y: t.y, text: 'AMBUSH!', side: STONE });
      return;
    }
  }

  moraleCollapse() {
    const game = this.game;
    const fighting = game.units.filter((u) => u.alive && u.battle && !u.routed);
    if (!fighting.length) return;
    const u = fighting.sort((a, b) => a.morale - b.morale)[0];
    u.morale = Math.max(0, u.morale - 0.25);
    const mine = u.side === LEAF;
    game.emit('feed', {
      kind: mine ? 'bad' : 'good',
      icon: '⚠',
      text: `Morale collapse in ${u.short}!`,
      unit: u,
      alert: mine,
    });
    game.emit('float', { x: u.x, y: u.y, text: 'MORALE COLLAPSE', side: 1 - u.side });
  }
}
