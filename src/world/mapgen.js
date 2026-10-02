// Builds the battlefield: Voronoi territories, terrain, heightmap, rivers that run
// along territory borders, a road network with bridges, and named locations.

import { Rng, Noise2D } from '../core/rng.js';
import { clamp, lerp, smoothstep, distToPolyline, distToSegment, chaikin, MinHeap } from '../core/util.js';
import {
  WORLD,
  LEAF,
  STONE,
  LOCATIONS,
  BRIDGE_OBJECTIVES,
  RIVERS,
  RANGES,
  LAKES,
  VILLAGE_NAMES,
  startFrontX,
  TERRAIN,
} from '../data/config.js';

const { W, H, MARGIN, CELL, HM_STEP } = WORLD;

export function edgeKey(a, b) {
  return a < b ? a * 16384 + b : b * 16384 + a;
}

function clipPoly(verts, labels, nx, ny, c, label) {
  const outV = [];
  const outL = [];
  const n = verts.length;
  for (let i = 0; i < n; i++) {
    const a = verts[i];
    const b = verts[(i + 1) % n];
    const la = labels[i];
    const fa = nx * a[0] + ny * a[1] - c;
    const fb = nx * b[0] + ny * b[1] - c;
    if (fa <= 0) {
      outV.push(a);
      outL.push(la);
      if (fb > 0) {
        const t = fa / (fa - fb);
        outV.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
        outL.push(label);
      }
    } else if (fb <= 0) {
      const t = fa / (fa - fb);
      outV.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
      outL.push(la);
    }
  }
  return [outV, outL];
}

export class GameMap {
  constructor(seed = 7) {
    this.seed = seed;
    this.rng = new Rng(seed);
    this.noise = new Noise2D(seed * 13 + 1);
    this.noise2 = new Noise2D(seed * 29 + 7);
    this.noise3 = new Noise2D(seed * 41 + 3);
    this.cells = [];
    this.edges = new Map(); // edgeKey -> { a, b, mx, my, len, river, road, bridge }
    this.locations = [];
    this.locByKey = {};
    this.rivers = []; // { key, name, pts (smoothed) }
    this.roads = []; // { pts, major }
    this.bridges = [];
  }

  generate() {
    this.buildCells();
    this.buildVertexGraph();
    this.classifyTerrain();
    this.placeLocations();
    this.buildRivers();
    this.buildRoads();
    this.placeBridgeObjectives();
    this.placeVillages();
    this.buildHeightmap();
    this.finalizeCells();
    return this;
  }

  // ---------------------------------------------------------------- cells
  buildCells() {
    const rng = this.rng;
    const rowH = CELL * 0.866;
    const rows = Math.ceil(H / rowH);
    const cols = Math.ceil(W / CELL) + 1;
    const sites = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        let x = (c + (r % 2 ? 0.0 : 0.5)) * CELL + rng.float(-0.27, 0.27) * CELL;
        let y = (r + 0.5) * rowH + rng.float(-0.27, 0.27) * CELL;
        x = clamp(x, 4, W - 4);
        y = clamp(y, 4, H - 4);
        sites.push([x, y]);
      }
    }
    // bucket grid for neighbor search
    const bs = CELL;
    const bw = Math.ceil(W / bs) + 1;
    const bh = Math.ceil(H / bs) + 1;
    const buckets = Array.from({ length: bw * bh }, () => []);
    sites.forEach((s, i) => buckets[Math.floor(s[1] / bs) * bw + Math.floor(s[0] / bs)].push(i));
    this.bucketSize = bs;
    this.bucketW = bw;
    this.bucketH = bh;
    this.buckets = buckets;

    for (let i = 0; i < sites.length; i++) {
      const [px, py] = sites[i];
      const bx = Math.floor(px / bs);
      const by = Math.floor(py / bs);
      const cand = [];
      for (let yy = by - 2; yy <= by + 2; yy++) {
        if (yy < 0 || yy >= bh) continue;
        for (let xx = bx - 2; xx <= bx + 2; xx++) {
          if (xx < 0 || xx >= bw) continue;
          for (const j of buckets[yy * bw + xx]) if (j !== i) cand.push(j);
        }
      }
      cand.sort((a, b) => {
        const da = (sites[a][0] - px) ** 2 + (sites[a][1] - py) ** 2;
        const db = (sites[b][0] - px) ** 2 + (sites[b][1] - py) ** 2;
        return da - db;
      });
      let verts = [
        [0, 0],
        [W, 0],
        [W, H],
        [0, H],
      ];
      let labels = [-1, -1, -1, -1];
      for (const j of cand) {
        const [qx, qy] = sites[j];
        const nx = qx - px;
        const ny = qy - py;
        const c = (qx * qx + qy * qy - px * px - py * py) / 2;
        [verts, labels] = clipPoly(verts, labels, nx, ny, c, j);
      }
      // drop zero-length edges
      const V = [];
      const L = [];
      for (let k = 0; k < verts.length; k++) {
        const a = verts[k];
        const b = verts[(k + 1) % verts.length];
        if (Math.hypot(a[0] - b[0], a[1] - b[1]) < 0.05) continue;
        V.push(a);
        L.push(labels[k]);
      }
      this.cells.push({
        id: i,
        x: px,
        y: py,
        poly: V,
        polyNbr: L,
        nbrs: [],
        terrain: 'plains',
        h: 0,
        owner: LEAF,
        loc: null,
        road: false,
        forestDensity: 0,
      });
    }
    // symmetric adjacency + edge info
    for (const c of this.cells) {
      const n = c.poly.length;
      for (let k = 0; k < n; k++) {
        const j = c.polyNbr[k];
        if (j < 0) continue;
        const a = c.poly[k];
        const b = c.poly[(k + 1) % n];
        const len = Math.hypot(a[0] - b[0], a[1] - b[1]);
        if (len < 0.5) continue;
        const key = edgeKey(c.id, j);
        if (!this.edges.has(key)) {
          this.edges.set(key, {
            a: Math.min(c.id, j),
            b: Math.max(c.id, j),
            mx: (a[0] + b[0]) / 2,
            my: (a[1] + b[1]) / 2,
            len,
            river: null,
            road: false,
            bridge: null,
          });
        }
      }
    }
    for (const e of this.edges.values()) {
      this.cells[e.a].nbrs.push(e.b);
      this.cells[e.b].nbrs.push(e.a);
    }
  }

  edge(a, b) {
    return this.edges.get(edgeKey(a, b));
  }

  // Shared polygon vertices -> graph used to route rivers along borders.
  buildVertexGraph() {
    const verts = [];
    const grid = new Map();
    const snap = (x, y) => {
      const gx = Math.round(x);
      const gy = Math.round(y);
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const list = grid.get((gx + dx) * 100000 + (gy + dy));
          if (!list) continue;
          for (const id of list) {
            const v = verts[id];
            if (Math.abs(v[0] - x) < 0.6 && Math.abs(v[1] - y) < 0.6) return id;
          }
        }
      }
      const id = verts.length;
      verts.push([x, y]);
      const k = gx * 100000 + gy;
      if (!grid.has(k)) grid.set(k, []);
      grid.get(k).push(id);
      return id;
    };
    const vEdges = new Map(); // key -> { u, v, cells: [] }
    const vAdj = [];
    for (const c of this.cells) {
      c.vids = c.poly.map((p) => snap(p[0], p[1]));
      const n = c.vids.length;
      for (let k = 0; k < n; k++) {
        const u = c.vids[k];
        const v = c.vids[(k + 1) % n];
        if (u === v) continue;
        const key = u < v ? u * 1000000 + v : v * 1000000 + u;
        let e = vEdges.get(key);
        if (!e) {
          e = { u: Math.min(u, v), v: Math.max(u, v), cells: [] };
          vEdges.set(key, e);
          (vAdj[u] ||= []).push(v);
          (vAdj[v] ||= []).push(u);
        }
        if (!e.cells.includes(c.id)) e.cells.push(c.id);
      }
    }
    this.verts = verts;
    this.vEdges = vEdges;
    this.vAdj = vAdj;
  }

  vEdge(u, v) {
    return this.vEdges.get(u < v ? u * 1000000 + v : v * 1000000 + u);
  }

  // ---------------------------------------------------------------- heights
  // Height before rivers/locations are carved in.
  baseHeight(x, y) {
    const n = this.noise;
    let h = 7 + 9 * n.fbm(x / 640, y / 640, 4);
    h += 16 * Math.max(0, this.noise2.fbm(x / 330 + 5, y / 330 - 3, 3) - 0.05);
    for (const r of RANGES) {
      const d = distToPolyline(x, y, r.pts);
      if (d >= r.width) continue;
      const m = 1 - smoothstep(0, r.width, d);
      const ridge = 0.5 + 0.55 * n.ridged(x / 210 + 3.3, y / 210 - 1.7, 5);
      h += r.height * Math.pow(m, 1.35) * ridge;
    }
    // coast just outside the playable area
    const dEdge = Math.min(x, W - x, y, H - y);
    const coast = smoothstep(-150, 6, dEdge + 18 * this.noise3.fbm(x / 140, y / 140, 3));
    h = lerp(-46, h, coast);
    return h;
  }

  classifyTerrain() {
    for (const c of this.cells) {
      let lake = false;
      for (const l of LAKES) if (Math.hypot(c.x - l.x, c.y - l.y) < l.r) lake = true;
      if (lake) {
        c.terrain = 'lake';
        continue;
      }
      // average height over the polygon so mountains read as mountains
      let hs = this.baseHeight(c.x, c.y);
      for (const p of c.poly) hs += this.baseHeight(lerp(c.x, p[0], 0.6), lerp(c.y, p[1], 0.6));
      const h = hs / (c.poly.length + 1);
      c.baseH = h;
      if (h > 62) {
        c.terrain = 'mountain';
        continue;
      }
      const f = this.noise3.fbm(c.x / 420 + 11, c.y / 420 + 4, 4) + (h > 30 ? 0.12 : 0);
      if (f > 0.17) {
        c.terrain = 'forest';
        c.forestDensity = clamp((f - 0.17) * 3.2 + 0.45, 0.45, 1);
      }
    }
  }

  nearestCell(x, y) {
    const bs = this.bucketSize;
    const bx = Math.floor(x / bs);
    const by = Math.floor(y / bs);
    let best = -1;
    let bd = Infinity;
    for (let r = 1; r <= 4 && best < 0; r++) {
      for (let yy = by - r; yy <= by + r; yy++) {
        if (yy < 0 || yy >= this.bucketH) continue;
        for (let xx = bx - r; xx <= bx + r; xx++) {
          if (xx < 0 || xx >= this.bucketW) continue;
          for (const j of this.buckets[yy * this.bucketW + xx]) {
            const c = this.cells[j];
            const d = (c.x - x) ** 2 + (c.y - y) ** 2;
            if (d < bd) {
              bd = d;
              best = j;
            }
          }
        }
      }
    }
    return best;
  }

  cellAt(x, y) {
    if (x < 0 || y < 0 || x > W || y > H) return -1;
    return this.nearestCell(x, y);
  }

  addLocation(def, cellId) {
    const c = this.cells[cellId];
    const loc = {
      id: this.locations.length,
      key: def.key,
      name: def.name,
      type: def.type,
      cell: cellId,
      x: c.x,
      y: c.y,
      side: def.side,
    };
    this.locations.push(loc);
    this.locByKey[def.key] = loc;
    c.loc = loc.id;
    if (def.type !== 'bridge' && def.type !== 'village') c.terrain = 'plains';
    if (def.type === 'village' && c.terrain === 'mountain') c.terrain = 'plains';
    return loc;
  }

  placeLocations() {
    for (const def of LOCATIONS) {
      let best = -1;
      let bd = Infinity;
      for (const c of this.cells) {
        if (c.terrain === 'lake' || c.loc !== null) continue;
        const d = Math.hypot(c.x - def.x, c.y - def.y);
        if (d < bd) {
          bd = d;
          best = c.id;
        }
      }
      this.addLocation(def, best);
    }
  }

  // ---------------------------------------------------------------- rivers
  buildRivers() {
    const verts = this.verts;
    const lakeCell = (id) => this.cells[id].terrain === 'lake';
    for (const def of RIVERS) {
      let start = -1;
      let bd = Infinity;
      verts.forEach((v, i) => {
        if (v[1] > 1) return;
        const d = Math.abs(v[0] - def.guide(0));
        if (d < bd) {
          bd = d;
          start = i;
        }
      });
      const dist = new Float64Array(verts.length).fill(Infinity);
      const prev = new Int32Array(verts.length).fill(-1);
      const heap = new MinHeap();
      dist[start] = 0;
      heap.push(start, 0);
      let goal = -1;
      while (heap.size) {
        const u = heap.pop();
        if (verts[u][1] >= H - 1) {
          goal = u;
          break;
        }
        for (const v of this.vAdj[u] || []) {
          const e = this.vEdge(u, v);
          const [ax, ay] = verts[u];
          const [bx, by] = verts[v];
          const len = Math.hypot(bx - ax, by - ay);
          const mx = (ax + bx) / 2;
          const my = (ay + by) / 2;
          const dev = (mx - def.guide(my)) / 55;
          let cost = len * (1 + dev * dev);
          if (by < ay) cost *= 3; // flow downhill (south)
          if (e.cells.length < 2 && my > 2 && my < H - 2) cost *= 40;
          if (e.cells.some(lakeCell)) cost *= 20;
          if (e.cells.some((cid) => this.cells[cid].loc !== null)) cost *= 1.5;
          const nd = dist[u] + cost;
          if (nd < dist[v]) {
            dist[v] = nd;
            prev[v] = u;
            heap.push(v, nd + (H - by) * 0.9);
          }
        }
      }
      const path = [];
      for (let v = goal; v >= 0; v = prev[v]) path.push(v);
      path.reverse();
      for (let i = 0; i < path.length - 1; i++) {
        const e = this.vEdge(path[i], path[i + 1]);
        if (e && e.cells.length === 2) {
          const ed = this.edge(e.cells[0], e.cells[1]);
          if (ed) ed.river = def.key;
        }
      }
      const raw = path.map((v) => [verts[v][0], verts[v][1]]);
      raw[0] = [raw[0][0], -60];
      raw[raw.length - 1] = [raw[raw.length - 1][0], H + 60];
      this.rivers.push({ key: def.key, name: def.name, raw, pts: chaikin(raw, 3) });
    }
  }

  // ---------------------------------------------------------------- roads
  cellPath(start, goal, costFn) {
    const n = this.cells.length;
    const dist = new Float64Array(n).fill(Infinity);
    const prev = new Int32Array(n).fill(-1);
    const heap = new MinHeap();
    dist[start] = 0;
    heap.push(start, 0);
    const g = this.cells[goal];
    while (heap.size) {
      const u = heap.pop();
      if (u === goal) break;
      const cu = this.cells[u];
      for (const v of cu.nbrs) {
        const step = costFn(u, v);
        if (!isFinite(step)) continue;
        const nd = dist[u] + step;
        if (nd < dist[v]) {
          dist[v] = nd;
          prev[v] = u;
          const cv = this.cells[v];
          heap.push(v, nd + Math.hypot(cv.x - g.x, cv.y - g.y) * 0.3);
        }
      }
    }
    if (!isFinite(dist[goal])) return null;
    const path = [];
    for (let v = goal; v >= 0; v = prev[v]) path.push(v);
    return path.reverse();
  }

  roadCost(u, v) {
    const cv = this.cells[v];
    const cu = this.cells[u];
    if (cv.terrain === 'lake') return Infinity;
    const e = this.edge(u, v);
    let m = cv.terrain === 'mountain' ? 5 : cv.terrain === 'forest' ? 1.5 : 1;
    let cost = Math.hypot(cv.x - cu.x, cv.y - cu.y) * m;
    if (e.road) cost *= 0.3;
    else if (e.river) cost += 300;
    return cost;
  }

  addRoad(path, major) {
    const pts = [];
    for (let i = 0; i < path.length; i++) {
      const c = this.cells[path[i]];
      c.road = true;
      if (i > 0) {
        const e = this.edge(path[i - 1], path[i]);
        e.road = true;
        if (e.river && !e.bridge) {
          const a = this.cells[e.a];
          const b = this.cells[e.b];
          e.bridge = {
            id: this.bridges.length,
            a: e.a,
            b: e.b,
            x: e.mx,
            y: e.my,
            angle: Math.atan2(b.y - a.y, b.x - a.x),
            river: e.river,
            destroyedUntil: -1,
          };
          this.bridges.push(e.bridge);
        }
        pts.push([e.mx, e.my]);
      }
      pts.push([c.x, c.y]);
    }
    this.roads.push({ path, pts: chaikin(pts, 2), major });
  }

  buildRoads() {
    const pairs = [
      ['sennai', 'osk'],
      ['sennai', 'halden'],
      ['sennai', 'mirel'],
      ['osk', 'tamsk'],
      ['tamsk', 'halden'],
      ['osk', 'arden'],
      ['arden', 'mirel'],
      ['osk', 'drav'],
      ['tamsk', 'kazan'],
      ['kazan', 'vorsk'],
      ['kazan', 'drav'],
      ['drav', 'kharzad'],
      ['drav', 'ketzen'],
      ['kharzad', 'vorsk'],
      ['kharzad', 'brask'],
      ['brask', 'ketzen'],
      ['arden', 'ketzen'],
      ['halden', 'kazan'],
    ];
    for (const [ka, kb] of pairs) {
      const a = this.locByKey[ka];
      const b = this.locByKey[kb];
      const path = this.cellPath(a.cell, b.cell, (u, v) => this.roadCost(u, v));
      if (path) this.addRoad(path, true);
    }
  }

  placeBridgeObjectives() {
    for (const def of BRIDGE_OBJECTIVES) {
      let best = null;
      let bd = Infinity;
      for (const br of this.bridges) {
        if (br.river !== def.river) continue;
        const d = Math.hypot(br.x - def.x, br.y - def.y);
        if (d < bd) {
          bd = d;
          best = br;
        }
      }
      if (!best) {
        // no road crosses: use the river edge closest to the target
        for (const e of this.edges.values()) {
          if (e.river !== def.river) continue;
          const d = Math.hypot(e.mx - def.x, e.my - def.y);
          if (d < bd) {
            bd = d;
            best = e;
          }
        }
        const a = this.cells[best.a];
        const b = this.cells[best.b];
        best.bridge = {
          id: this.bridges.length,
          a: best.a,
          b: best.b,
          x: best.mx,
          y: best.my,
          angle: Math.atan2(b.y - a.y, b.x - a.x),
          river: def.river,
          destroyedUntil: -1,
        };
        best.road = true;
        this.bridges.push(best.bridge);
        best = best.bridge;
      }
      const ca = this.cells[best.a];
      const cb = this.cells[best.b];
      let cell = def.bank === 'east' ? (ca.x > cb.x ? ca : cb) : ca.x < cb.x ? ca : cb;
      if (cell.loc !== null) cell = cell === ca ? cb : ca;
      best.objective = def.key;
      const loc = this.addLocation({ ...def, type: 'bridge' }, cell.id);
      loc.bridge = best.id;
      cell.terrain = cell.terrain === 'mountain' ? 'plains' : cell.terrain;
    }
  }

  placeVillages() {
    const rng = this.rng;
    const names = rng.shuffle(VILLAGE_NAMES.slice());
    const cand = this.cells.filter(
      (c) =>
        c.terrain !== 'lake' &&
        c.terrain !== 'mountain' &&
        c.loc === null &&
        c.x > 60 &&
        c.x < W - 60 &&
        c.y > 60 &&
        c.y < H - 60,
    );
    rng.shuffle(cand);
    let n = 0;
    for (const c of cand) {
      if (n >= 24) break;
      const near = this.locations.some((l) => Math.hypot(l.x - c.x, l.y - c.y) < (l.type === 'village' ? 250 : 210));
      if (near) continue;
      const loc = this.addLocation({ key: 'v' + n, name: names[n % names.length], type: 'village', side: null }, c.id);
      // minor road to the nearest bigger location
      let best = null;
      let bd = Infinity;
      for (const l of this.locations) {
        if (l.type === 'village' || l.type === 'bridge') continue;
        const d = Math.hypot(l.x - c.x, l.y - c.y);
        if (d < bd) {
          bd = d;
          best = l;
        }
      }
      if (best && bd < 520) {
        const path = this.cellPath(c.id, best.cell, (u, v) => this.roadCost(u, v));
        if (path) {
          // stop the minor road where it meets an existing road
          let cut = path.length;
          for (let i = 1; i < path.length; i++) {
            if (this.cells[path[i]].road) {
              cut = i + 1;
              break;
            }
          }
          this.addRoad(path.slice(0, cut), false);
        }
      }
      loc.village = true;
      n++;
    }
  }

  // ---------------------------------------------------------------- heightmap
  buildHeightmap() {
    const step = HM_STEP;
    const gw = Math.round((W + 2 * MARGIN) / step) + 1;
    const gh = Math.round((H + 2 * MARGIN) / step) + 1;
    const hm = new Float32Array(gw * gh);
    const flat = this.locations
      .filter((l) => l.type !== 'bridge')
      .map((l) => {
        const c = this.cells[l.cell];
        const r = l.type === 'capital' ? 78 : l.type === 'city' ? 62 : l.type === 'fort' ? 56 : 36;
        return { x: c.x, y: c.y, r, h: Math.max(4, Math.min(this.baseHeight(c.x, c.y), 40)) };
      });
    for (let j = 0; j < gh; j++) {
      const y = -MARGIN + j * step;
      for (let i = 0; i < gw; i++) {
        const x = -MARGIN + i * step;
        let h = this.baseHeight(x, y);
        for (const f of flat) {
          const d = Math.hypot(x - f.x, y - f.y);
          if (d < f.r * 1.6) h = lerp(f.h, h, smoothstep(f.r * 0.55, f.r * 1.6, d));
        }
        for (const l of LAKES) {
          const d = Math.hypot(x - l.x, y - l.y) + 14 * this.noise3.get(x / 40, y / 40);
          if (d < l.r + 45) h = lerp(-16, h, smoothstep(l.r * 0.72, l.r + 45, d));
        }
        hm[j * gw + i] = h;
      }
    }
    // carve rivers
    for (const r of this.rivers) {
      const pts = r.pts;
      for (let k = 0; k < pts.length - 1; k++) {
        const [ax, ay] = pts[k];
        const [bx, by] = pts[k + 1];
        const minX = Math.min(ax, bx) - 40;
        const maxX = Math.max(ax, bx) + 40;
        const minY = Math.min(ay, by) - 40;
        const maxY = Math.max(ay, by) + 40;
        const i0 = Math.max(0, Math.floor((minX + MARGIN) / step));
        const i1 = Math.min(gw - 1, Math.ceil((maxX + MARGIN) / step));
        const j0 = Math.max(0, Math.floor((minY + MARGIN) / step));
        const j1 = Math.min(gh - 1, Math.ceil((maxY + MARGIN) / step));
        for (let j = j0; j <= j1; j++) {
          for (let i = i0; i <= i1; i++) {
            const x = -MARGIN + i * step;
            const y = -MARGIN + j * step;
            const d = distToSegment(x, y, ax, ay, bx, by);
            if (d > 24) continue;
            const idx = j * gw + i;
            const target = lerp(-10, hm[idx], smoothstep(5, 21, d));
            if (target < hm[idx]) hm[idx] = target;
          }
        }
      }
    }
    this.hm = hm;
    this.hmW = gw;
    this.hmH = gh;
  }

  heightAt(x, y) {
    const gx = (x + MARGIN) / HM_STEP;
    const gy = (y + MARGIN) / HM_STEP;
    const i = clamp(Math.floor(gx), 0, this.hmW - 2);
    const j = clamp(Math.floor(gy), 0, this.hmH - 2);
    const fx = clamp(gx - i, 0, 1);
    const fy = clamp(gy - j, 0, 1);
    const w = this.hmW;
    const h00 = this.hm[j * w + i];
    const h10 = this.hm[j * w + i + 1];
    const h01 = this.hm[(j + 1) * w + i];
    const h11 = this.hm[(j + 1) * w + i + 1];
    // match the mesh triangulation (diagonal from (i,j+1) to (i+1,j))
    if (fx + fy <= 1) return h00 + (h10 - h00) * fx + (h01 - h00) * fy;
    return h11 + (h01 - h11) * (1 - fx) + (h10 - h11) * (1 - fy);
  }

  finalizeCells() {
    for (const c of this.cells) {
      c.h = this.heightAt(c.x, c.y);
      if (
        c.terrain !== 'lake' &&
        c.loc === null &&
        c.h < WORLD.WATER + 2.5 &&
        LAKES.some((l) => Math.hypot(c.x - l.x, c.y - l.y) < l.r + 70)
      ) {
        c.terrain = 'lake';
      }
      if (c.terrain === 'lake') c.owner = -1;
      else c.owner = c.x < startFrontX(c.y) ? LEAF : STONE;
      c.passable = c.terrain !== 'lake';
    }
    for (const l of this.locations) {
      if (l.side !== null && l.side !== undefined) this.cells[l.cell].owner = l.side;
      l.owner = this.cells[l.cell].owner;
    }
    // cells near each other (for zone of control)
    const R = CELL * 1.45;
    for (const c of this.cells) {
      const near = new Set([c.id]);
      for (const n of c.nbrs) {
        near.add(n);
        for (const m of this.cells[n].nbrs) near.add(m);
      }
      c.near = [...near].filter((id) => Math.hypot(this.cells[id].x - c.x, this.cells[id].y - c.y) <= R);
    }
  }

  terrainName(cellId) {
    const c = this.cells[cellId];
    if (c.loc !== null) {
      const l = this.locations[c.loc];
      if (l.type !== 'village' && l.type !== 'bridge') return l.name;
    }
    return TERRAIN[c.terrain].name;
  }

  // Nearest named place to a point, for naming battles and events.
  placeName(x, y) {
    let best = null;
    let bd = Infinity;
    for (const l of this.locations) {
      const d = Math.hypot(l.x - x, l.y - y);
      if (d < bd) {
        bd = d;
        best = l;
      }
    }
    if (!best) return 'at the front';
    return (bd < 60 ? 'at ' : 'near ') + best.name;
  }
}
