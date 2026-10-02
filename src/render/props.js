// Static scenery: forests, towns, forts, bridges, flags and objective beacons.

import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { WORLD, SIDES, OBJECTIVES, LEAF, STONE } from '../data/config.js';
import { Rng } from '../core/rng.js';
import { resample } from '../core/util.js';
import { forestField } from './terrain.js';

const { W, H, WATER } = WORLD;

export function colored(geo, hex) {
  const g = geo.index ? geo.toNonIndexed() : geo;
  const c = new THREE.Color(hex);
  const n = g.attributes.position.count;
  const col = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    col[i * 3] = c.r;
    col[i * 3 + 1] = c.g;
    col[i * 3 + 2] = c.b;
  }
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  if (g.attributes.uv) g.deleteAttribute('uv');
  return g;
}

// Coarse mask of cells close to roads and rivers so scenery keeps them clear.
class Mask {
  constructor(step) {
    this.step = step;
    this.w = Math.ceil(W / step) + 1;
    this.h = Math.ceil(H / step) + 1;
    this.data = new Uint8Array(this.w * this.h);
  }
  markLine(pts, radius) {
    const s = this.step;
    const r = Math.ceil(radius / s);
    for (const [x, y] of resample(pts, s * 0.5)) {
      const i0 = Math.round(x / s);
      const j0 = Math.round(y / s);
      for (let j = j0 - r; j <= j0 + r; j++) {
        for (let i = i0 - r; i <= i0 + r; i++) {
          if (i < 0 || j < 0 || i >= this.w || j >= this.h) continue;
          if (Math.hypot(i * s - x, j * s - y) <= radius) this.data[j * this.w + i] = 1;
        }
      }
    }
  }
  at(x, y) {
    const i = Math.round(x / this.step);
    const j = Math.round(y / this.step);
    if (i < 0 || j < 0 || i >= this.w || j >= this.h) return 1;
    return this.data[j * this.w + i];
  }
}

export class Props {
  constructor(rig, map, opts = {}) {
    this.rig = rig;
    this.map = map;
    this.scene = rig.scene;
    this.quality = opts.quality || 1;
    this.mask = new Mask(5);
    for (const r of map.roads) this.mask.markLine(r.pts, r.major ? 9 : 7);
    for (const r of map.rivers) this.mask.markLine(r.pts, 15);
    this.buildTrees();
    this.buildTowns();
    this.buildForts();
    this.buildBridges();
    this.buildFlags();
    this.buildBeacons();
    this.buildRocks();
  }

  slope(x, y) {
    const m = this.map;
    const h = m.heightAt(x, y);
    return Math.hypot(m.heightAt(x + 4, y) - h, m.heightAt(x, y + 4) - h) / 4;
  }

  nearTown(x, y, pad = 0) {
    for (const l of this.map.locations) {
      if (l.type === 'bridge') continue;
      const r = (l.type === 'capital' ? 82 : l.type === 'city' ? 62 : l.type === 'fort' ? 52 : 34) + pad;
      if (Math.hypot(x - l.x, y - l.y) < r) return true;
    }
    return false;
  }

  buildTrees() {
    const map = this.map;
    const rng = new Rng(map.seed * 3 + 5);
    const conifer = mergeGeometries([
      colored(new THREE.CylinderGeometry(0.5, 0.7, 4, 5).translate(0, 2, 0), '#5b4330'),
      colored(new THREE.ConeGeometry(4.6, 8, 7).translate(0, 7.2, 0), '#2c5530'),
      colored(new THREE.ConeGeometry(3.4, 6.5, 7).translate(0, 11, 0), '#336238'),
      colored(new THREE.ConeGeometry(2.1, 4.5, 6).translate(0, 14, 0), '#3a6b3c'),
    ]);
    const leafy = mergeGeometries([
      colored(new THREE.CylinderGeometry(0.6, 0.85, 5, 5).translate(0, 2.5, 0), '#5d4631'),
      colored(new THREE.IcosahedronGeometry(4.6, 0).translate(0, 8.2, 0), '#4d7a36'),
      colored(new THREE.IcosahedronGeometry(3.2, 0).translate(1.8, 10.4, 0.8), '#5a8a3c'),
    ]);
    const spotsC = [];
    const spotsL = [];
    const step = 12.5 / Math.sqrt(this.quality);
    for (let y = 8; y < H - 4; y += step) {
      for (let x = 8; x < W - 4; x += step) {
        const px = x + rng.float(-0.45, 0.45) * step;
        const py = y + rng.float(-0.45, 0.45) * step;
        const h = map.heightAt(px, py);
        if (h < WATER + 2.5 || h > 132) continue;
        if (this.mask.at(px, py)) continue;
        const f = forestField(map, px, py, h);
        const dense = f > 0.16 + rng.float(-0.03, 0.05);
        const lone = !dense && f > -0.05 && rng.chance(0.022);
        if (!dense && !lone) continue;
        if (this.slope(px, py) > 1.5) continue;
        if (this.nearTown(px, py, 4)) continue;
        const isConifer = h > 42 || rng.chance(py < 700 ? 0.55 : 0.3);
        (isConifer ? spotsC : spotsL).push([
          px,
          h,
          py,
          rng.float(0.55, 1.0),
          rng.float(0, Math.PI * 2),
          rng.float(0.82, 1.12),
        ]);
      }
    }
    const mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.92, flatShading: true });
    const place = (geo, spots) => {
      const mesh = new THREE.InstancedMesh(geo, mat, spots.length);
      const m = new THREE.Matrix4();
      const q = new THREE.Quaternion();
      const e = new THREE.Euler();
      const s = new THREE.Vector3();
      const p = new THREE.Vector3();
      const c = new THREE.Color();
      spots.forEach(([x, h, y, sc, rot, br], i) => {
        e.set(0, rot, 0);
        q.setFromEuler(e);
        s.set(sc, sc * (0.9 + (br - 0.8)), sc);
        p.set(x, h - 0.6, y);
        m.compose(p, q, s);
        mesh.setMatrixAt(i, m);
        c.setRGB(br, br * (0.96 + (rot % 0.08)), br * 0.95);
        mesh.setColorAt(i, c);
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.instanceMatrix.needsUpdate = true;
      this.scene.add(mesh);
      return mesh;
    };
    this.conifers = place(conifer, spotsC);
    this.leafy = place(leafy, spotsL);
    this.treeCount = spotsC.length + spotsL.length;
  }

  // Boulders scattered over rocky slopes give the mountains some bite.
  buildRocks() {
    const map = this.map;
    const rng = new Rng(map.seed * 23 + 9);
    const spots = [];
    for (let i = 0; i < 26000 && spots.length < 2000 * this.quality; i++) {
      const x = rng.float(0, W);
      const y = rng.float(0, H);
      const h = map.heightAt(x, y);
      if (h < 38 || this.mask.at(x, y) || this.nearTown(x, y, 10)) continue;
      const slope = this.slope(x, y);
      if (slope < 0.35 && h < 70) continue;
      spots.push([x, h, y, rng.float(0.9, 2.8) * (h > 120 ? 1.2 : 1), rng.float(0, Math.PI * 2), rng.float(0.75, 1.05)]);
    }
    const geo = new THREE.DodecahedronGeometry(1.6, 0);
    const mat = new THREE.MeshStandardMaterial({ color: '#9a9184', roughness: 0.95, flatShading: true });
    const mesh = new THREE.InstancedMesh(geo, mat, spots.length);
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const e = new THREE.Euler();
    const c = new THREE.Color();
    spots.forEach(([x, h, y, sc, rot, br], i) => {
      e.set(rot * 0.7, rot, rot * 0.3);
      q.setFromEuler(e);
      m.compose(new THREE.Vector3(x, h + sc * 0.3, y), q, new THREE.Vector3(sc * 1.3, sc * 0.8, sc));
      mesh.setMatrixAt(i, m);
      c.setRGB(br, br * 0.97, br * 0.93);
      mesh.setColorAt(i, c);
    });
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.scene.add(mesh);
  }

  buildTowns() {
    const map = this.map;
    const rng = new Rng(map.seed * 17 + 2);
    const houses = [];
    const towers = [];
    const walls = [];
    for (const l of map.locations) {
      if (l.type === 'bridge' || l.type === 'fort') continue;
      const cfg = {
        capital: { n: 62, r: 60, big: 1.25 },
        city: { n: 34, r: 44, big: 1.1 },
        village: { n: 7, r: 21, big: 0.85 },
      }[l.type];
      // central landmark
      if (l.type !== 'village') {
        towers.push({ x: l.x, y: l.y, h: l.type === 'capital' ? 34 : 22, r: l.type === 'capital' ? 7 : 5 });
      }
      let placed = 0;
      for (let tries = 0; tries < cfg.n * 6 && placed < cfg.n; tries++) {
        const a = rng.float(0, Math.PI * 2);
        const r = Math.sqrt(rng.next()) * cfg.r + 9;
        const x = l.x + Math.cos(a) * r;
        const y = l.y + Math.sin(a) * r;
        const h = map.heightAt(x, y);
        if (h < WATER + 2) continue;
        if (this.mask.at(x, y)) continue;
        if (houses.some((o) => Math.hypot(o.x - x, o.y - y) < 9.5)) continue;
        const rot = Math.round(a / (Math.PI / 2)) * (Math.PI / 2) + rng.float(-0.2, 0.2);
        const w = rng.float(6, 10) * cfg.big;
        const d = rng.float(5, 7) * cfg.big;
        const hh = rng.float(4.5, 7) * cfg.big * (r < cfg.r * 0.5 && l.type !== 'village' ? 1.5 : 1);
        houses.push({ x, y, h, w, d, hh, rot, wall: rng.int(0, 3), roof: rng.int(0, 3) });
        placed++;
      }
      if (l.type === 'capital') {
        const R = 74;
        const segs = 40;
        for (let i = 0; i < segs; i++) {
          const a0 = (i / segs) * Math.PI * 2;
          const a1 = ((i + 1) / segs) * Math.PI * 2;
          const x0 = l.x + Math.cos(a0) * R;
          const y0 = l.y + Math.sin(a0) * R;
          const x1 = l.x + Math.cos(a1) * R;
          const y1 = l.y + Math.sin(a1) * R;
          const mx = (x0 + x1) / 2;
          const my = (y0 + y1) / 2;
          if (this.mask.at(mx, my)) continue; // gates where roads enter
          walls.push({
            x: mx,
            y: my,
            len: Math.hypot(x1 - x0, y1 - y0) + 0.6,
            rot: -Math.atan2(y1 - y0, x1 - x0),
            tower: i % 4 === 0,
          });
        }
      }
    }
    const wallCols = ['#e3d7bf', '#cdbd9d', '#b5a993', '#ece3d0'].map((c) => new THREE.Color(c));
    const roofCols = ['#a24a30', '#7d4a36', '#5b616d', '#b0583a'].map((c) => new THREE.Color(c));
    const bodyGeo = new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0);
    const roofGeo = new THREE.CylinderGeometry(1, 1, 1, 3).rotateZ(Math.PI / 2).rotateX(-Math.PI / 2);
    // normalise the prism: base at y=0, unit width/depth
    roofGeo.translate(0, 0.5, 0);
    roofGeo.scale(1, 0.66, 1 / 1.732);
    const mat = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.85, flatShading: true });
    const bodies = new THREE.InstancedMesh(bodyGeo, mat, houses.length + walls.length);
    const roofs = new THREE.InstancedMesh(roofGeo, mat, houses.length);
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const e = new THREE.Euler();
    const s = new THREE.Vector3();
    const p = new THREE.Vector3();
    houses.forEach((o, i) => {
      e.set(0, o.rot, 0);
      q.setFromEuler(e);
      p.set(o.x, o.h - 1, o.y);
      s.set(o.w, o.hh + 1, o.d);
      m.compose(p, q, s);
      bodies.setMatrixAt(i, m);
      bodies.setColorAt(i, wallCols[o.wall]);
      p.set(o.x, o.h + o.hh, o.y);
      s.set(o.w * 1.08, o.d * 0.9, o.d * 1.12);
      m.compose(p, q, s);
      roofs.setMatrixAt(i, m);
      roofs.setColorAt(i, roofCols[o.roof]);
    });
    const stone = new THREE.Color('#a39d90');
    walls.forEach((w, k) => {
      const i = houses.length + k;
      e.set(0, w.rot, 0);
      q.setFromEuler(e);
      const h = this.map.heightAt(w.x, w.y);
      p.set(w.x, h - 2, w.y);
      s.set(w.len, w.tower ? 15 : 10, w.tower ? 7 : 3.5);
      m.compose(p, q, s);
      bodies.setMatrixAt(i, m);
      bodies.setColorAt(i, stone);
    });
    for (const b of [bodies, roofs]) {
      b.castShadow = true;
      b.receiveShadow = true;
      b.instanceMatrix.needsUpdate = true;
      this.scene.add(b);
    }
    // landmark towers
    const towerGeo = mergeGeometries([
      colored(new THREE.CylinderGeometry(1, 1.1, 1, 8).translate(0, 0.5, 0), '#d9cdb5'),
      colored(new THREE.ConeGeometry(1.35, 0.55, 8).translate(0, 1.27, 0), '#8a3d2a'),
    ]);
    const tmat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.8, flatShading: true });
    const tm = new THREE.InstancedMesh(towerGeo, tmat, towers.length);
    towers.forEach((t, i) => {
      const h = this.map.heightAt(t.x, t.y);
      m.compose(new THREE.Vector3(t.x, h - 1, t.y), new THREE.Quaternion(), new THREE.Vector3(t.r, t.h, t.r));
      tm.setMatrixAt(i, m);
    });
    tm.castShadow = true;
    tm.receiveShadow = true;
    this.scene.add(tm);
  }

  buildForts() {
    const map = this.map;
    const forts = map.locations.filter((l) => l.type === 'fort');
    const shape = new THREE.Shape();
    const pts = 5;
    const R = 40;
    const r = 27;
    for (let i = 0; i < pts * 2; i++) {
      const a = (i / (pts * 2)) * Math.PI * 2 - Math.PI / 2;
      const rr = i % 2 === 0 ? R : r;
      const x = Math.cos(a) * rr;
      const y = Math.sin(a) * rr;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();
    const hole = new THREE.Path();
    for (let i = 0; i < pts * 2; i++) {
      const a = (i / (pts * 2)) * Math.PI * 2 - Math.PI / 2;
      const rr = i % 2 === 0 ? R - 8 : r - 6;
      const x = Math.cos(a) * rr;
      const y = Math.sin(a) * rr;
      if (i === 0) hole.moveTo(x, y);
      else hole.lineTo(x, y);
    }
    hole.closePath();
    shape.holes.push(hole);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 11,
      bevelEnabled: true,
      bevelSize: 1.2,
      bevelThickness: 1.2,
      bevelSegments: 1,
    });
    geo.rotateX(-Math.PI / 2);
    const mat = new THREE.MeshStandardMaterial({ color: '#9f988a', roughness: 0.9, flatShading: true });
    const inner = new THREE.MeshStandardMaterial({ color: '#7d7466', roughness: 0.9, flatShading: true });
    for (const f of forts) {
      const h = map.heightAt(f.x, f.y);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(f.x, h - 3, f.y);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.scene.add(mesh);
      // keep and barracks inside
      const keep = new THREE.Mesh(new THREE.BoxGeometry(12, 14, 12), inner);
      keep.position.set(f.x, h + 5, f.y);
      keep.castShadow = true;
      this.scene.add(keep);
      for (let k = 0; k < 3; k++) {
        const a = (k / 3) * Math.PI * 2 + 0.4;
        const b = new THREE.Mesh(new THREE.BoxGeometry(10, 6, 5), inner);
        b.position.set(f.x + Math.cos(a) * 16, h + 2, f.y + Math.sin(a) * 16);
        b.rotation.y = -a;
        b.castShadow = true;
        this.scene.add(b);
      }
    }
  }

  buildBridges() {
    const map = this.map;
    this.bridgeMeshes = [];
    const wood = new THREE.MeshStandardMaterial({ color: '#8a6a48', roughness: 0.85, flatShading: true });
    const stone = new THREE.MeshStandardMaterial({ color: '#8f887c', roughness: 0.9, flatShading: true });
    for (const br of map.bridges) {
      const group = new THREE.Group();
      const ca = map.cells[br.a];
      const cb = map.cells[br.b];
      const ang = Math.atan2(cb.y - ca.y, cb.x - ca.x);
      const L = 46;
      const ha = map.heightAt(br.x - Math.cos(ang) * L * 0.5, br.y - Math.sin(ang) * L * 0.5);
      const hb = map.heightAt(br.x + Math.cos(ang) * L * 0.5, br.y + Math.sin(ang) * L * 0.5);
      const deckY = Math.max(WATER + 3.5, Math.min(ha, hb) + 1.5);
      const parts = [];
      for (let k = -1; k <= 1; k++) {
        const seg = new THREE.Mesh(new THREE.BoxGeometry(L / 3 + 0.4, 1.6, 9), wood);
        seg.position.set((k * L) / 3, 0, 0);
        seg.castShadow = true;
        seg.receiveShadow = true;
        group.add(seg);
        for (const side of [-1, 1]) {
          const rail = new THREE.Mesh(new THREE.BoxGeometry(L / 3, 1.6, 0.7), wood);
          rail.position.set((k * L) / 3, 1.6, side * 4.3);
          group.add(rail);
          parts.push({ mesh: rail, k });
        }
        parts.push({ mesh: seg, k });
      }
      for (const px of [-L / 6, L / 6]) {
        const pier = new THREE.Mesh(new THREE.BoxGeometry(3.5, 14, 10), stone);
        pier.position.set(px, -7.5, 0);
        group.add(pier);
      }
      group.position.set(br.x, deckY, br.y);
      group.rotation.y = -ang;
      this.scene.add(group);
      this.bridgeMeshes[br.id] = { group, parts, destroyed: false };
    }
  }

  setBridgeDestroyed(id, destroyed) {
    const b = this.bridgeMeshes[id];
    if (!b || b.destroyed === destroyed) return;
    b.destroyed = destroyed;
    for (const p of b.parts) if (p.k === 0) p.mesh.visible = !destroyed;
  }

  buildFlags() {
    const map = this.map;
    this.flagLocs = map.locations.filter((l) => l.type !== 'village');
    const n = this.flagLocs.length;
    const poleGeo = new THREE.CylinderGeometry(0.45, 0.55, 30, 6).translate(0, 15, 0);
    const poleMat = new THREE.MeshStandardMaterial({ color: '#d8d8d8', roughness: 0.4, metalness: 0.6 });
    const poles = new THREE.InstancedMesh(poleGeo, poleMat, n);
    const flagGeo = new THREE.PlaneGeometry(14, 8, 10, 2).translate(7, 0, 0);
    const flagMat = new THREE.MeshStandardMaterial({ color: '#ffffff', side: THREE.DoubleSide, roughness: 0.7 });
    this.flagTime = { value: 0 };
    flagMat.onBeforeCompile = (shader) => {
      shader.uniforms.time = this.flagTime;
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', '#include <common>\nuniform float time;')
        .replace(
          '#include <begin_vertex>',
          `#include <begin_vertex>
          float ph = instanceMatrix[3].x * 0.05 + instanceMatrix[3].z * 0.07;
          transformed.z += sin(position.x * 0.45 - time * 5.0 + ph) * position.x * 0.12;
          transformed.y += sin(position.x * 0.3 - time * 3.0 + ph) * position.x * 0.04;`,
        );
    };
    const flags = new THREE.InstancedMesh(flagGeo, flagMat, n);
    const m = new THREE.Matrix4();
    this.flagLocs.forEach((l, i) => {
      const h = map.heightAt(l.x, l.y);
      const top = l.type === 'capital' ? 52 : l.type === 'fort' ? 34 : 30;
      const sx = l.type === 'capital' ? 1.4 : 1;
      m.compose(
        new THREE.Vector3(l.x, h + (l.type === 'fort' ? 10 : 0), l.y),
        new THREE.Quaternion(),
        new THREE.Vector3(sx, top / 30, sx),
      );
      poles.setMatrixAt(i, m);
      m.compose(
        new THREE.Vector3(l.x, h + top + (l.type === 'fort' ? 10 : 0) - 4.5, l.y),
        new THREE.Quaternion(),
        new THREE.Vector3(sx, sx, sx),
      );
      flags.setMatrixAt(i, m);
    });
    poles.castShadow = true;
    flags.castShadow = true;
    this.scene.add(poles);
    this.scene.add(flags);
    this.flags = flags;
    this.updateFlags();
  }

  updateFlags() {
    const c = new THREE.Color();
    this.flagLocs.forEach((l, i) => {
      c.set(l.owner === LEAF ? SIDES[LEAF].color : l.owner === STONE ? SIDES[STONE].color : '#cccccc');
      this.flags.setColorAt(i, c);
    });
    this.flags.instanceColor.needsUpdate = true;
  }

  buildBeacons() {
    const map = this.map;
    const keys = [...OBJECTIVES[LEAF], ...OBJECTIVES[STONE]];
    this.beacons = [];
    const geo = new THREE.CylinderGeometry(9, 14, 260, 20, 1, true).translate(0, 130, 0);
    for (const k of keys) {
      const l = map.locByKey[k];
      const mat = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        uniforms: { color: { value: new THREE.Color('#ffffff') }, time: this.flagTime, strength: { value: 1 } },
        vertexShader: /* glsl */ `
          varying float vH; varying vec3 vN; varying vec3 vV;
          void main() {
            vH = position.y / 260.0;
            vec4 wp = modelMatrix * vec4(position, 1.0);
            vN = normalize(mat3(modelMatrix) * normal);
            vV = normalize(cameraPosition - wp.xyz);
            gl_Position = projectionMatrix * viewMatrix * wp;
          }`,
        fragmentShader: /* glsl */ `
          uniform vec3 color; uniform float time; uniform float strength;
          varying float vH; varying vec3 vN; varying vec3 vV;
          void main() {
            float edge = pow(1.0 - abs(dot(vN, vV)), 1.5);
            float a = (1.0 - vH) * (1.0 - vH) * (0.25 + 0.75 * (1.0 - edge));
            a *= 0.32 + 0.08 * sin(time * 2.5 - vH * 12.0);
            gl_FragColor = vec4(color * a * strength, 1.0);
          }`,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(l.x, map.heightAt(l.x, l.y), l.y);
      mesh.renderOrder = 5;
      this.scene.add(mesh);
      this.beacons.push({ loc: l, mesh, mat });
    }
    this.updateBeacons();
  }

  updateBeacons() {
    for (const b of this.beacons) {
      const owner = b.loc.owner;
      b.mat.uniforms.color.value.set(owner === LEAF ? '#7dffa0' : '#ff7a5c');
    }
  }

  update(now, camDist) {
    this.flagTime.value = now;
    for (const b of this.beacons) b.mat.uniforms.strength.value = Math.min(1.2, Math.max(0.25, camDist / 1400));
  }
}
