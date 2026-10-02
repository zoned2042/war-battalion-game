// The war itself: owns the map, battalions, battles, AI and the clock.

import { Rng } from '../core/rng.js';
import {
  LEAF,
  STONE,
  SIDES,
  WORLD,
  DIFFICULTY,
  GENERALS,
  ARMIES,
  BATTALIONS,
  OBJECTIVES,
  CAPITAL,
  LOCATION_TYPES,
  CAPTAINS,
  HOURS_PER_SECOND,
  START_YEAR,
  startFrontX,
} from '../data/config.js';
import { createUnit, updateMovement, updateRecovery, resetUnitIds } from './units.js';
import { Orders } from './orders.js';
import { Combat } from './combat.js';
import { Territory } from './territory.js';
import { EnemyAI } from './ai.js';
import { BattlefieldEvents } from './events.js';

const SIEGE_HOURS = { capital: 28, city: 10, fort: 14, bridge: 8 };

export class Game {
  constructor(map, difficulty = 'normal') {
    this.map = map;
    this.difficulty = difficulty;
    this.diff = DIFFICULTY[difficulty];
    this.rng = new Rng(Date.now() & 0xffff);
    this.captainPool = this.rng.shuffle(CAPTAINS.slice());
    this.time = 0;
    this.speed = 1;
    this.paused = false;
    this.listeners = {};
    this.units = [];
    this.unitById = new Map();
    this.weather = { type: 'clear', until: Infinity };
    this.supplied = [new Uint8Array(map.cells.length), new Uint8Array(map.cells.length)];
    this.collapsing = [false, false];
    this.objectives = OBJECTIVES;
    this.aiSides = new Set([STONE]);
    this.over = null;
    this.stats = { battles: 0, battlesWon: 0, enemyDestroyed: 0, unitsLost: 0, placesTaken: 0, placesLost: 0 };
    this.acc = { zoc: 0, supply: 0, hour: 0 };
    this.sieges = new Map();
    this.occ = [new Int16Array(map.cells.length), new Int16Array(map.cells.length)];
    this.occDirty = true;

    this.generals = {};
    for (const g of GENERALS) this.generals[g.id] = { ...g, woundedUntil: -1 };
    this.armies = {};
    for (const a of ARMIES) this.armies[a.id] = { ...a };

    this.combat = new Combat(this);
    this.orders = new Orders(this);
    this.territory = new Territory(this);
    resetUnitIds();
    this.placeStartingUnits();
    this.ai = new EnemyAI(this, STONE);
    this.events = new BattlefieldEvents(this);
    this.territory.updateSupply();
    this.startShare = this.territory.controlShare();
  }

  // ---------------------------------------------------------------- events
  on(type, fn) {
    (this.listeners[type] ||= []).push(fn);
  }

  emit(type, data) {
    for (const fn of this.listeners[type] || []) fn(data);
  }

  // ---------------------------------------------------------------- setup
  placeStartingUnits() {
    const map = this.map;
    const taken = new Set();
    for (const def of BATTALIONS) {
      let cell;
      if (def.at) {
        cell = map.locByKey[def.at].cell;
      } else {
        const fx = startFrontX(def.y);
        const x = def.side === LEAF ? fx - def.depth : fx + def.depth;
        cell = map.nearestCell(x, def.y);
      }
      // find the nearest free, friendly, passable cell
      const ok = (id) => {
        const c = map.cells[id];
        return c.passable && c.owner === def.side && !taken.has(id);
      };
      if (!ok(cell)) {
        const start = map.cells[cell];
        let best = cell;
        let bd = Infinity;
        for (const c of map.cells) {
          if (!ok(c.id)) continue;
          const d = Math.hypot(c.x - start.x, c.y - start.y);
          if (d < bd) {
            bd = d;
            best = c.id;
          }
        }
        cell = best;
      }
      taken.add(cell);
      const u = this.addUnit({ ...def, cell });
      u.entrench = 0.45; // the war starts from prepared positions
    }
  }

  addUnit(def) {
    if (!def.captain && this.captainPool.length) def = { ...def, captain: this.captainPool.pop() };
    const u = createUnit(this, def);
    this.units.push(u);
    this.unitById.set(u.id, u);
    this.occDirty = true;
    this.emit('unitAdded', u);
    return u;
  }

  // ---------------------------------------------------------------- queries
  occupancy() {
    if (this.occDirty) {
      this.occ[0].fill(0);
      this.occ[1].fill(0);
      for (const u of this.units) if (u.alive && !u.routed) this.occ[u.side][u.cell]++;
      this.occDirty = false;
    }
    return this.occ;
  }

  unitsInCell(cell) {
    return this.units.filter((u) => u.alive && u.cell === cell);
  }

  enemiesInCell(side, cell) {
    if (this.occupancy()[1 - side][cell] === 0) return [];
    return this.units.filter((u) => u.alive && u.side !== side && u.cell === cell && !u.routed);
  }

  locHeal(loc) {
    return LOCATION_TYPES[loc.type].heal;
  }

  locMorale(loc) {
    return LOCATION_TYPES[loc.type].morale;
  }

  general(u) {
    const a = this.armies[u.army];
    return a && a.general ? this.generals[a.general] : null;
  }

  isVisible(u) {
    if (u.side === LEAF || this.weather.type !== 'fog') return true;
    if (u.battle) return true;
    for (const o of this.units) {
      if (!o.alive || o.side !== LEAF) continue;
      const r = o.type === 'scout' ? 430 : 250;
      if (Math.hypot(o.x - u.x, o.y - u.y) < r) return true;
    }
    return false;
  }

  dateString() {
    const t = this.time + 6;
    const day = Math.floor(t / 24) + 1;
    const hour = Math.floor(t % 24);
    return { year: START_YEAR, day, hour: String(hour).padStart(2, '0') + ':00' };
  }

  // ---------------------------------------------------------------- mutations
  enterCell(u, cell) {
    u.cell = cell;
    this.occDirty = true;
    const c = this.map.cells[cell];
    if (u.routed) return;
    // overrun any routed enemies caught here
    for (const o of this.units) {
      if (o.alive && o.routed && o.side !== u.side && o.cell === cell) {
        o.soldiers *= 0.88;
        o.org = Math.max(0, o.org - 0.1);
      }
    }
    if (c.owner !== u.side) {
      const loc = c.loc !== null ? this.map.locations[c.loc] : null;
      if (loc && SIEGE_HOURS[loc.type]) this.startSiege(cell, loc, u);
      else this.territory.setOwner(cell, u.side, u);
    }
    const b = this.combat.battleAt(cell);
    if (b && b.defenders.length && b.defenders[0].side === u.side) this.combat.addDefender(b, u);
  }

  // Strongholds are not taken by walking in: they must be held for a while.
  startSiege(cell, loc, u) {
    if (this.sieges.has(cell)) return;
    const need = SIEGE_HOURS[loc.type];
    this.sieges.set(cell, { cell, loc, side: u.side, progress: 0, need, start: this.time });
    const mine = u.side === LEAF;
    const isObj = this.objectives[LEAF].includes(loc.key) || this.objectives[STONE].includes(loc.key);
    this.emit('siege', { cell, loc, side: u.side });
    this.emit('feed', {
      kind: mine ? 'good' : 'bad',
      icon: mine ? '⚑' : '⚠',
      text: mine
        ? `${u.short} is taking ${loc.name} — hold it for ${need}h`
        : `${loc.name} is under siege! It falls in ${need}h unless we drive them out`,
      cell,
      alert: !mine,
    });
    if (!mine && (isObj || loc.type === 'capital')) {
      this.emit('banner', {
        text: `${loc.name.toUpperCase()} UNDER SIEGE`,
        sub: `Send battalions to drive the enemy out — ${need}h left`,
        kind: 'bad',
      });
    }
  }

  updateSieges(dt) {
    for (const [cell, s] of this.sieges) {
      const holders = this.units.filter((o) => o.alive && !o.routed && o.side === s.side && o.cell === cell);
      const owner = this.map.cells[cell].owner;
      if (!holders.length || owner === s.side) {
        this.sieges.delete(cell);
        if (owner !== s.side) {
          this.emit('feed', {
            kind: s.side === LEAF ? 'bad' : 'good',
            icon: s.side === LEAF ? '⚠' : '🛡',
            text: s.side === LEAF ? `Our siege of ${s.loc.name} was broken` : `The siege of ${s.loc.name} is lifted!`,
            cell,
          });
        }
        continue;
      }
      if (holders.some((h) => h.battle && h.role === 'def')) continue; // fighting off a relief attack
      s.progress += dt * (1 + 0.25 * (holders.length - 1));
      if (s.progress >= s.need) {
        this.sieges.delete(cell);
        this.territory.setOwner(cell, s.side, holders[0]);
      }
    }
  }

  destroyUnit(u, reason) {
    if (!u.alive) return;
    this.combat.removeUnit(u, 'destroyed');
    u.alive = false;
    u.path = [];
    u.moving = false;
    this.occDirty = true;
    const mine = u.side === LEAF;
    if (mine) this.stats.unitsLost++;
    else this.stats.enemyDestroyed++;
    const verb = reason === 'surrender' ? 'surrounded and forced to surrender' : 'destroyed';
    this.emit('feed', {
      kind: mine ? 'bad' : 'good',
      icon: mine ? '☠' : '★',
      text: `${u.name} ${verb}!`,
      x: u.x,
      y: u.y,
      alert: mine,
    });
    this.emit('float', {
      x: u.x,
      y: u.y,
      text: reason === 'surrender' ? 'SURRENDERED' : 'DESTROYED',
      side: 1 - u.side,
    });
    this.emit('unitDestroyed', u);
  }

  onLocationCaptured(loc, side, by) {
    const mine = side === LEAF;
    const big = loc.type !== 'village';
    if (big) {
      if (mine) this.stats.placesTaken++;
      else this.stats.placesLost++;
    }
    const isObjective = this.objectives[LEAF].includes(loc.key) || this.objectives[STONE].includes(loc.key);
    if (big) {
      // the fallen stronghold rattles nearby defenders
      for (const u of this.units) {
        if (!u.alive || u.side === side) continue;
        if (Math.hypot(u.x - loc.x, u.y - loc.y) < WORLD.CELL * 3) {
          u.shakenUntil = this.time + 24;
          u.morale = Math.max(0, u.morale - 0.06);
        }
      }
    }
    if (big || isObjective) {
      this.emit('feed', {
        kind: mine ? 'good' : 'bad',
        icon: mine ? '⚑' : '⚠',
        text: mine ? `${loc.name} captured${by ? ' by ' + by.short : ''}!` : `${loc.name} has fallen to the enemy!`,
        cell: loc.cell,
        alert: !mine,
      });
      this.emit('banner', {
        text: `${loc.name.toUpperCase()} ${mine ? 'CAPTURED' : 'LOST'}`,
        sub: mine
          ? isObjective
            ? 'Objective secured — nearby enemy battalions are shaken'
            : 'The front advances'
          : isObjective
            ? 'A key objective has fallen!'
            : 'The enemy pushes forward',
        kind: mine ? 'good' : 'bad',
      });
    }
    this.emit('locationCaptured', { loc, side });
    this.checkObjectives();
  }

  objectivesHeld(side) {
    return this.objectives[side].filter((k) => this.map.locByKey[k].owner === side).length;
  }

  checkObjectives() {
    if (this.over) return;
    for (const side of [LEAF, STONE]) {
      const foe = 1 - side;
      const held = this.objectivesHeld(side);
      const collapsing = held >= 2;
      if (collapsing && !this.collapsing[foe]) {
        this.collapsing[foe] = true;
        const hit = foe === LEAF ? 0.04 : 0.1;
        for (const u of this.units) if (u.alive && u.side === foe) u.morale = Math.max(0, u.morale - hit);
        const mineCollapsing = foe === LEAF;
        this.emit('banner', {
          text: mineCollapsing ? 'OUR FRONT IS COLLAPSING' : 'ENEMY FRONT COLLAPSING',
          sub: mineCollapsing
            ? 'Retake our objectives before the army breaks!'
            : 'Press the attack — victory is within reach',
          kind: mineCollapsing ? 'bad' : 'good',
          big: true,
        });
      } else if (!collapsing && this.collapsing[foe]) {
        this.collapsing[foe] = false;
        this.emit('feed', { kind: 'info', icon: '⚑', text: `The ${SIDES[foe].short} front stabilizes` });
      }
    }
    const capFallen = (side) => this.map.locByKey[CAPITAL[side]].owner !== side;
    const share = this.territory.controlShare();
    // an army squeezed into a corner of the map has collapsed
    const cornered = (side) => (side === LEAF ? share : 1 - share) < 0.08;
    const armyGone = (side) => this.units.filter((u) => u.alive && u.side === side).length <= 1 || cornered(side);
    if (capFallen(STONE) || this.objectivesHeld(LEAF) === this.objectives[LEAF].length || armyGone(STONE)) {
      this.end(
        LEAF,
        capFallen(STONE)
          ? 'Kharzad has fallen. The Stone Dominion surrenders.'
          : armyGone(STONE)
            ? 'The Stone army has collapsed and surrenders.'
            : 'Every objective is in Leaf hands. The enemy sues for peace.',
      );
    } else if (capFallen(LEAF) || this.objectivesHeld(STONE) === this.objectives[STONE].length || armyGone(LEAF)) {
      this.end(
        STONE,
        capFallen(LEAF)
          ? 'Sennai has fallen.'
          : armyGone(LEAF)
            ? 'Our army has collapsed.'
            : 'The enemy holds all of our key positions.',
      );
    }
  }

  // Idle player battalions next to a struggling fight join it on their own.
  autoSupport() {
    for (const b of this.combat.battles) {
      if (b.over) continue;
      const leafAtt = b.attSide === LEAF;
      const ours = leafAtt ? b.attackers : b.defenders;
      if (!ours.length || (leafAtt ? b.adv : 1 - b.adv) > 0.65) continue;
      for (const u of this.units) {
        if (!u.alive || u.side !== LEAF || u.battle || u.routed || u.moving || u.type === 'medical') continue;
        if (u.order.type !== 'idle' && u.order.type !== 'defend') continue;
        if (u.soldiers / u.max < 0.4 || u.org < 0.4) continue;
        if (Math.hypot(u.x - b.x, u.y - b.y) > WORLD.CELL * 2.6) continue;
        if (this.orders.reinforce(u, ours[0])) {
          this.emit('feed', { kind: 'good', icon: '→', text: `${u.short} moves up to support ${ours[0].short}`, unit: u });
        }
      }
    }
  }

  end(winner, reason) {
    if (this.over) return;
    this.over = { winner, reason, time: this.time };
    this.emit('gameOver', this.over);
  }

  // ---------------------------------------------------------------- loop
  update(realDt) {
    if (this.paused || this.over) return;
    let hours = Math.min(realDt, 0.1) * HOURS_PER_SECOND * this.speed;
    while (hours > 1e-6) {
      const dt = Math.min(hours, 0.2);
      this.step(dt);
      hours -= dt;
      if (this.over) break;
    }
  }

  step(dt) {
    this.time += dt;
    this.occDirty = true;
    for (const u of this.units) if (u.alive) updateMovement(this, u, dt);
    this.combat.update(dt);
    this.updateSieges(dt);
    for (const u of this.units) if (u.alive) updateRecovery(this, u, dt);
    this.acc.zoc += dt;
    this.acc.supply += dt;
    this.acc.hour += dt;
    if (this.acc.zoc >= 0.5) {
      this.acc.zoc = 0;
      this.territory.updateZoc();
    }
    if (this.acc.supply >= 2) {
      this.acc.supply = 0;
      this.territory.updateSupply();
    }
    if (this.acc.hour >= 1) {
      this.acc.hour = 0;
      for (const u of this.units) if (u.alive) this.orders.refresh(u);
      this.autoSupport();
      this.checkObjectives();
    }
    this.ai.update();
    this.events.update(dt);
  }
}
