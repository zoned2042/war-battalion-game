// Battalions on the map as actual formations of little soldiers.

import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { SIDES, LEAF, STONE } from '../data/config.js';
import { colored } from './props.js';

const MAX_FIG = 1800;
const SX = 9.6;
const SZ = 9.4;

function soldierGeo(side) {
  const uni = side === LEAF ? '#3f7a45' : '#8a3a30';
  const helmet = side === LEAF ? '#2f5a33' : '#5e2721';
  const parts = [
    colored(new THREE.BoxGeometry(1.2, 3.4, 0.8).translate(0, 1.7, -0.55), '#3b3a32'),
    colored(new THREE.BoxGeometry(1.2, 3.4, 0.8).translate(0, 1.7, 0.55), '#3b3a32'),
    colored(new THREE.BoxGeometry(1.7, 3.3, 2.4).translate(0, 4.9, 0), uni),
    colored(new THREE.BoxGeometry(0.7, 2.8, 0.7).translate(0.4, 5.0, -1.45), uni),
    colored(new THREE.BoxGeometry(0.7, 2.8, 0.7).translate(0.4, 5.0, 1.45), uni),
    colored(new THREE.SphereGeometry(0.85, 8, 6).translate(0, 7.25, 0), '#e2b48c'),
    colored(new THREE.SphereGeometry(1.05, 8, 5, 0, Math.PI * 2, 0, Math.PI / 2).translate(0, 7.45, 0), helmet),
    colored(new THREE.BoxGeometry(4.2, 0.35, 0.35).translate(1.6, 5.2, 0.9), '#2a2622'),
    colored(new THREE.BoxGeometry(1.1, 1.6, 1.8).translate(-1.3, 5.2, 0), '#5d5340'),
  ];
  return mergeGeometries(parts).scale(1.75, 1.75, 1.75);
}

function cannonGeo() {
  return mergeGeometries([
    colored(new THREE.CylinderGeometry(0.75, 1.05, 11, 8).rotateZ(Math.PI / 2).translate(3.5, 3.6, 0), '#2e3230'),
    colored(new THREE.BoxGeometry(7, 1.6, 3.2).translate(-1, 2.6, 0), '#4b4a3a'),
    colored(new THREE.BoxGeometry(6, 0.8, 0.8).rotateZ(0.25).translate(-5, 1.2, 1.1), '#4b4a3a'),
    colored(new THREE.BoxGeometry(6, 0.8, 0.8).rotateZ(0.25).translate(-5, 1.2, -1.1), '#4b4a3a'),
    colored(new THREE.CylinderGeometry(2.6, 2.6, 0.7, 12).rotateX(Math.PI / 2).translate(0, 2.6, 2.2), '#3a3328'),
    colored(new THREE.CylinderGeometry(2.6, 2.6, 0.7, 12).rotateX(Math.PI / 2).translate(0, 2.6, -2.2), '#3a3328'),
    colored(new THREE.BoxGeometry(0.6, 4.2, 5).translate(1.8, 4.6, 0), '#454536'),
  ]).scale(1.5, 1.5, 1.5);
}

function carGeo(side) {
  const body = side === LEAF ? '#4c6a3c' : '#6e4a36';
  const parts = [
    colored(new THREE.BoxGeometry(11, 3.4, 6).translate(0, 3.2, 0), body),
    colored(new THREE.BoxGeometry(5, 2, 5).translate(-1, 5.8, 0), body),
    colored(new THREE.CylinderGeometry(0.4, 0.4, 5, 6).rotateZ(Math.PI / 2).translate(3.6, 6, 0), '#222'),
    colored(new THREE.BoxGeometry(3, 1.8, 5.4).translate(4.6, 4.6, 0), body),
  ];
  for (const x of [-3.5, 3.5]) {
    for (const z of [-3, 3]) {
      parts.push(colored(new THREE.CylinderGeometry(1.6, 1.6, 1.2, 10).rotateX(Math.PI / 2).translate(x, 1.6, z), '#1f1f1f'));
    }
  }
  return mergeGeometries(parts).scale(1.45, 1.45, 1.45);
}

function tentGeo() {
  return mergeGeometries([
    colored(new THREE.CylinderGeometry(5.5, 5.5, 13, 3).rotateZ(Math.PI / 2).rotateX(-Math.PI / 2).translate(0, 2.75, 0), '#efeee6'),
    colored(new THREE.BoxGeometry(5, 0.4, 1.4).translate(0, 8.4, 0), '#d22a2a'),
    colored(new THREE.BoxGeometry(1.4, 0.4, 5).translate(0, 8.4, 0), '#d22a2a'),
  ]).scale(1.4, 1.4, 1.4);
}

const hash = (n) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export class Formations {
  constructor(rig, map) {
    this.rig = rig;
    this.map = map;
    this.scene = rig.scene;
    const mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.75, flatShading: true });
    const mk = (geo, n) => {
      const m = new THREE.InstancedMesh(geo, mat, n);
      m.castShadow = true;
      m.receiveShadow = false;
      m.frustumCulled = false;
      m.count = 0;
      this.scene.add(m);
      return m;
    };
    this.figs = [mk(soldierGeo(LEAF), MAX_FIG), mk(soldierGeo(STONE), MAX_FIG)];
    this.cannons = mk(cannonGeo(), 120);
    this.cars = [mk(carGeo(LEAF), 60), mk(carGeo(STONE), 60)];
    this.tents = mk(tentGeo(), 40);
    this.sandbags = mk(colored(new THREE.BoxGeometry(7, 3, 3.4), '#b9a578'), 600);

    // banners
    const poleGeo = colored(new THREE.CylinderGeometry(0.4, 0.4, 28, 5).translate(0, 14, 0), '#3b2f22');
    this.poles = mk(poleGeo, 120);
    const flagGeo = new THREE.PlaneGeometry(12, 7.5, 8, 2).translate(6, 0, 0);
    this.flagTime = { value: 0 };
    const flagMat = new THREE.MeshStandardMaterial({ color: '#ffffff', side: THREE.DoubleSide, roughness: 0.7 });
    flagMat.onBeforeCompile = (shader) => {
      shader.uniforms.time = this.flagTime;
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', '#include <common>\nuniform float time;')
        .replace(
          '#include <begin_vertex>',
          `#include <begin_vertex>
          float ph = instanceMatrix[3].x * 0.09 + instanceMatrix[3].z * 0.05;
          transformed.z += sin(position.x * 0.6 - time * 6.0 + ph) * position.x * 0.13;`,
        );
    };
    this.banners = new THREE.InstancedMesh(flagGeo, flagMat, 120);
    this.banners.frustumCulled = false;
    this.banners.castShadow = true;
    this.banners.count = 0;
    this.scene.add(this.banners);

    // selection rings
    this.rings = [];
    const ringGeo = new THREE.RingGeometry(34, 39, 48).rotateX(-Math.PI / 2);
    this.ringMat = new THREE.MeshBasicMaterial({ color: '#ffe066', transparent: true, opacity: 0.9, depthTest: false, depthWrite: false });
    this.enemyRingMat = new THREE.MeshBasicMaterial({ color: '#ff5a4a', transparent: true, opacity: 0.85, depthTest: false, depthWrite: false });
    for (let i = 0; i < 30; i++) {
      const r = new THREE.Mesh(ringGeo, this.ringMat);
      r.renderOrder = 20;
      r.visible = false;
      this.scene.add(r);
      this.rings.push(r);
    }

    this.state = new Map();
    this.m = new THREE.Matrix4();
    this.q = new THREE.Quaternion();
    this.e = new THREE.Euler();
    this.s = new THREE.Vector3();
    this.p = new THREE.Vector3();
    this.c = new THREE.Color();
  }

  stateFor(u) {
    let st = this.state.get(u.id);
    if (!st) {
      st = { h: u.heading, front: [], center: [u.x, 0, u.y], spread: 1, fade: 0 };
      this.state.set(u.id, st);
    }
    return st;
  }

  put(mesh, idx, x, y, z, rotY, sx = 1, sy = 1, sz = 1, tilt = 0) {
    this.e.set(0, rotY, tilt, 'YXZ');
    this.q.setFromEuler(this.e);
    this.p.set(x, y, z);
    this.s.set(sx, sy, sz);
    this.m.compose(this.p, this.q, this.s);
    mesh.setMatrixAt(idx, this.m);
  }

  update(now, dt, game, selected, hoverEnemy) {
    const map = this.map;
    const counts = { f0: 0, f1: 0, cannon: 0, car0: 0, car1: 0, tent: 0, bag: 0, ban: 0 };
    this.flagTime.value = now;
    for (const u of game.units) {
      if (!u.alive) {
        this.state.delete(u.id);
        continue;
      }
      if (!game.isVisible(u)) continue;
      const st = this.stateFor(u);
      // smooth facing
      let d = u.heading - st.h;
      while (d > Math.PI) d -= Math.PI * 2;
      while (d < -Math.PI) d += Math.PI * 2;
      st.h += d * Math.min(1, dt * 5);
      const h = st.h;
      const fx = Math.cos(h);
      const fz = Math.sin(h);
      const lx = -fz;
      const lz = fx;
      const rotY = -h;
      const wantSpread = u.routed ? 1.7 : u.battle ? 1.1 : 1;
      st.spread += (wantSpread - st.spread) * Math.min(1, dt * 2);
      const spread = st.spread;
      const fighting = !!u.battle;
      const moving = u.moving && u.speedNow > 0;

      let nFig;
      let heavy = 0;
      let cars = 0;
      let tents = 0;
      if (u.type === 'heavy') {
        heavy = Math.max(1, Math.min(3, Math.round(u.soldiers / 200)));
        nFig = Math.max(2, Math.min(8, Math.round(u.soldiers / 90)));
      } else if (u.type === 'scout') {
        cars = Math.max(1, Math.min(3, Math.round(u.soldiers / 140)));
        nFig = Math.max(1, Math.min(4, Math.round(u.soldiers / 120)));
      } else if (u.type === 'medical') {
        tents = moving ? 0 : 2;
        nFig = Math.max(2, Math.min(6, Math.round(u.soldiers / 60)));
      } else {
        nFig = Math.max(2, Math.min(16, Math.round(u.soldiers / 64)));
      }
      const cols = Math.max(1, Math.ceil(Math.sqrt(nFig * 1.7)));
      const rows = Math.ceil(nFig / cols);
      st.front.length = 0;
      const figMesh = this.figs[u.side];
      const key = u.side === LEAF ? 'f0' : 'f1';
      const baseFwd = ((rows - 1) / 2) * SZ;
      for (let i = 0; i < nFig; i++) {
        if (counts[key] >= MAX_FIG) break;
        const row = Math.floor(i / cols);
        const inRow = row === rows - 1 ? nFig - row * cols : cols;
        const col = i % cols;
        const seed = u.id * 31 + i;
        const jx = (hash(seed) - 0.5) * 2.4;
        const jz = (hash(seed + 7) - 0.5) * 2.4;
        let lat = ((col - (inRow - 1) / 2) * SX + jx) * spread;
        let fwd = (baseFwd - row * SZ + jz) * spread;
        let bob = 0;
        let sy = 1;
        let tilt = 0;
        let rot = rotY;
        if (moving) {
          bob = Math.abs(Math.sin(now * 9 + seed)) * 0.9;
          tilt = -0.08;
        }
        if (fighting) {
          const ph = now * 3 + seed * 1.3;
          fwd += Math.sin(ph) * 1.2;
          lat += Math.sin(ph * 0.7) * 0.8;
          if (row === 0 && hash(seed + Math.floor(now * 0.7)) > 0.5) sy = 0.72; // kneeling to fire
          rot += Math.sin(ph * 0.5) * 0.15;
        }
        if (u.routed) {
          rot += Math.PI + (hash(seed + 3) - 0.5) * 1.2;
          bob = Math.abs(Math.sin(now * 12 + seed)) * 1.2;
        }
        const x = u.x + fx * fwd + lx * lat;
        const z = u.y + fz * fwd + lz * lat;
        const y = map.heightAt(x, z) - 0.3 + bob;
        this.put(figMesh, counts[key]++, x, y, z, rot, 1, sy, 1, tilt);
        if (row === 0) st.front.push([x + fx * 6, y + 9 * sy, z + fz * 6]);
      }
      // heavy guns lead the formation
      for (let k = 0; k < heavy; k++) {
        const lat = (k - (heavy - 1) / 2) * 20;
        const fwd = baseFwd + 16;
        const x = u.x + fx * fwd + lx * lat;
        const z = u.y + fz * fwd + lz * lat;
        const recoil = fighting ? Math.max(0, Math.sin(now * 2.2 + k * 2.1 + u.id)) ** 8 * -1.6 : 0;
        this.put(this.cannons, counts.cannon++, x + fx * recoil, map.heightAt(x, z) - 0.2, z + fz * recoil, rotY);
        st.front.push([x + fx * 16, map.heightAt(x, z) + 6, z + fz * 16]);
      }
      for (let k = 0; k < cars; k++) {
        const lat = (k - (cars - 1) / 2) * 19;
        const fwd = baseFwd + 14;
        const x = u.x + fx * fwd + lx * lat;
        const z = u.y + fz * fwd + lz * lat;
        const mesh = this.cars[u.side];
        const ck = u.side === LEAF ? 'car0' : 'car1';
        this.put(mesh, counts[ck]++, x, map.heightAt(x, z) + (moving ? Math.sin(now * 14 + k) * 0.3 : 0), z, rotY);
        st.front.push([x + fx * 8, map.heightAt(x, z) + 6, z + fz * 8]);
      }
      for (let k = 0; k < tents; k++) {
        const lat = (k - 0.5) * 24;
        const fwd = -baseFwd - 16;
        const x = u.x + fx * fwd + lx * lat;
        const z = u.y + fz * fwd + lz * lat;
        this.put(this.tents, counts.tent++, x, map.heightAt(x, z) - 0.3, z, rotY + Math.PI / 2);
      }
      // sandbag line when dug in
      if (u.entrench > 0.3 && !moving && !u.routed) {
        const nb = Math.min(7, 3 + Math.floor(u.entrench * 5));
        const half = (cols * SX) / 2 + 6;
        const fwd = baseFwd + 11;
        for (let k = 0; k < nb; k++) {
          const t = nb === 1 ? 0 : k / (nb - 1) - 0.5;
          const lat = t * half * 2;
          const bend = -Math.abs(t) * 7;
          const x = u.x + fx * (fwd + bend) + lx * lat;
          const z = u.y + fz * (fwd + bend) + lz * lat;
          this.put(this.sandbags, counts.bag++, x, map.heightAt(x, z) + 0.6, z, rotY + Math.PI / 2 + t * 0.9);
        }
      }
      // battalion banner at the rear
      {
        const fwd = -baseFwd - 6;
        const x = u.x + fx * fwd;
        const z = u.y + fz * fwd;
        const y = map.heightAt(x, z) + (moving ? Math.abs(Math.sin(now * 9 + u.id)) * 0.8 : 0);
        this.put(this.poles, counts.ban, x, y, z, 0);
        this.put(this.banners, counts.ban, x, y + 24, z, rotY + Math.PI);
        this.c.set(SIDES[u.side].color);
        this.banners.setColorAt(counts.ban, this.c);
        counts.ban++;
      }
      st.center = [u.x, map.heightAt(u.x, u.y), u.y];
    }
    this.figs[0].count = counts.f0;
    this.figs[1].count = counts.f1;
    this.cannons.count = counts.cannon;
    this.cars[0].count = counts.car0;
    this.cars[1].count = counts.car1;
    this.tents.count = counts.tent;
    this.sandbags.count = counts.bag;
    this.poles.count = counts.ban;
    this.banners.count = counts.ban;
    for (const mesh of [...this.figs, this.cannons, ...this.cars, this.tents, this.sandbags, this.poles, this.banners]) {
      mesh.instanceMatrix.needsUpdate = true;
    }
    if (this.banners.instanceColor) this.banners.instanceColor.needsUpdate = true;

    // selection rings
    let r = 0;
    const pulse = 1 + Math.sin(now * 5) * 0.06;
    const ringFor = (u, mat) => {
      if (r >= this.rings.length) return;
      const ring = this.rings[r++];
      ring.visible = true;
      ring.material = mat;
      ring.position.set(u.x, map.heightAt(u.x, u.y) + 1.5, u.y);
      ring.scale.setScalar(pulse);
    };
    for (const u of selected) if (u.alive) ringFor(u, this.ringMat);
    if (hoverEnemy && hoverEnemy.alive) ringFor(hoverEnemy, this.enemyRingMat);
    for (; r < this.rings.length; r++) this.rings[r].visible = false;
  }
}
