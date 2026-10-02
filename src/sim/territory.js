// Territory control: zone-of-control capture, encirclement/supply, and the
// geometry of the front line.

import { WORLD, LEAF, STONE } from '../data/config.js';
import { chaikin } from '../core/util.js';

const ZOC_R = WORLD.CELL * 1.3;

export class Territory {
  constructor(game) {
    this.game = game;
    const n = game.map.cells.length;
    this.control = [new Uint8Array(n), new Uint8Array(n)];
    this.version = 0; // bumps whenever ownership changes
    this.frontCache = null;
    this.frontVersion = -1;
  }

  setOwner(cellId, side, by) {
    const game = this.game;
    const c = game.map.cells[cellId];
    if (c.owner === side || !c.passable) return false;
    c.owner = side;
    this.version++;
    game.emit('captured', { cell: cellId, side });
    if (c.loc !== null) {
      const loc = game.map.locations[c.loc];
      loc.owner = side;
      if (by) by.stats.captured++;
      game.onLocationCaptured(loc, side, by);
    }
    return true;
  }

  // Units project control onto nearby cells; uncontested cells flip.
  updateZoc() {
    const game = this.game;
    const map = game.map;
    const [c0, c1] = this.control;
    c0.fill(0);
    c1.fill(0);
    const occ = game.occupancy();
    for (const u of game.units) {
      if (!u.alive || u.routed || u.order.type === 'retreat') continue;
      const ctl = this.control[u.side];
      for (const id of map.cells[u.cell].near) {
        const c = map.cells[id];
        if (Math.hypot(c.x - u.x, c.y - u.y) <= ZOC_R) ctl[id] = 1;
      }
    }
    const flips = [];
    for (const c of map.cells) {
      if (!c.passable) continue;
      const o = c.owner;
      const other = 1 - o;
      if (occ[o][c.id] > 0 || occ[other][c.id] > 0) continue;
      if (game.combat.battleAt(c.id)) continue;
      const loc = c.loc !== null ? map.locations[c.loc] : null;
      const hardPoint = loc && loc.type !== 'village';
      if (!hardPoint && this.control[other][c.id] && !this.control[o][c.id]) {
        flips.push([c.id, other]);
        continue;
      }
      if (!this.control[o][c.id]) {
        // isolated pockets fold into the surrounding side
        let own = 0;
        let opp = 0;
        for (const nb of c.nbrs) {
          const cn = map.cells[nb];
          if (!cn.passable) continue;
          if (cn.owner === o) own++;
          else if (cn.owner === other) opp++;
        }
        // towns and forts fall only once fully cut off; objectives must be taken by force
        const fold = hardPoint ? own === 0 && opp >= 1 && !this.isObjective(loc) : own <= 1 && opp >= 4;
        if (fold) flips.push([c.id, other]);
      }
    }
    for (const [id, side] of flips) this.setOwner(id, side, null);
  }

  isObjective(loc) {
    const objs = this.game.objectives;
    return objs[LEAF].includes(loc.key) || objs[STONE].includes(loc.key);
  }

  // Cells connected to a friendly city, fort, capital or home map edge.
  updateSupply() {
    const game = this.game;
    const map = game.map;
    const n = map.cells.length;
    for (const side of [LEAF, STONE]) {
      const sup = new Uint8Array(n);
      const queue = [];
      for (const c of map.cells) {
        if (c.owner !== side) continue;
        const loc = c.loc !== null ? map.locations[c.loc] : null;
        const source = (loc && (loc.type === 'capital' || loc.type === 'city' || loc.type === 'fort')) ||
          (side === LEAF ? c.x < 70 : c.x > WORLD.W - 70);
        if (source) {
          sup[c.id] = 1;
          queue.push(c.id);
        }
      }
      let qi = 0;
      while (qi < queue.length) {
        const id = queue[qi++];
        for (const nb of map.cells[id].nbrs) {
          if (sup[nb] || map.cells[nb].owner !== side) continue;
          sup[nb] = 1;
          queue.push(nb);
        }
      }
      game.supplied[side] = sup;
    }
    for (const u of game.units) {
      if (!u.alive) continue;
      const was = u.surrounded;
      u.surrounded = !game.supplied[u.side][u.cell];
      if (u.surrounded && !was) {
        const mine = u.side === LEAF;
        game.emit('feed', {
          kind: mine ? 'bad' : 'good',
          icon: '⚠',
          text: mine ? `${u.short} is surrounded!` : `Enemy ${u.short} is surrounded!`,
          unit: u,
          alert: mine,
        });
        game.emit('float', { x: u.x, y: u.y, text: 'SURROUNDED!', side: 1 - u.side });
      }
    }
  }

  controlShare() {
    let a = 0;
    let b = 0;
    for (const c of this.game.map.cells) {
      if (c.owner === LEAF) a++;
      else if (c.owner === STONE) b++;
    }
    return a / Math.max(1, a + b);
  }

  // Front line polylines: borders between Leaf and Stone cells, chained and smoothed.
  frontLines() {
    if (this.frontVersion === this.version && this.frontCache) return this.frontCache;
    const map = this.game.map;
    const segs = [];
    for (const c of map.cells) {
      if (c.owner !== LEAF) continue;
      const n = c.poly.length;
      for (let k = 0; k < n; k++) {
        const nb = c.polyNbr[k];
        if (nb < 0) continue;
        if (map.cells[nb].owner !== STONE) continue;
        segs.push([c.vids[k], c.vids[(k + 1) % n]]);
      }
    }
    // chain segments into polylines
    const adj = new Map();
    segs.forEach((s, i) => {
      for (const v of s) {
        if (!adj.has(v)) adj.set(v, []);
        adj.get(v).push(i);
      }
    });
    const used = new Uint8Array(segs.length);
    const lines = [];
    const walk = (startSeg, startV) => {
      const pts = [startV];
      let v = startV;
      let si = startSeg;
      for (;;) {
        used[si] = 1;
        const s = segs[si];
        const nv = s[0] === v ? s[1] : s[0];
        pts.push(nv);
        v = nv;
        const nexts = (adj.get(v) || []).filter((j) => !used[j]);
        if (!nexts.length) break;
        si = nexts[0];
      }
      return pts;
    };
    // start from endpoints first so open lines are not split
    for (const [v, list] of adj) {
      if (list.length !== 1) continue;
      const si = list[0];
      if (used[si]) continue;
      lines.push(walk(si, v));
    }
    for (let i = 0; i < segs.length; i++) {
      if (used[i]) continue;
      lines.push(walk(i, segs[i][0]));
    }
    const verts = map.verts;
    this.frontCache = lines
      .map((ids) => {
        const raw = ids.map((id) => [verts[id][0], verts[id][1]]);
        const closed = ids.length > 3 && ids[0] === ids[ids.length - 1];
        return { pts: chaikin(closed ? raw.slice(0, -1) : raw, 2, closed), closed };
      })
      .filter((l) => l.pts.length > 1);
    this.frontVersion = this.version;
    return this.frontCache;
  }
}
