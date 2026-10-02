// Particles, tracers, explosions, rain and clouds.

import * as THREE from 'three';
import { WORLD, SIDES } from '../data/config.js';

function dotTexture(soft = 0.0) {
  const s = 64;
  const c = document.createElement('canvas');
  c.width = s;
  c.height = s;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.25 + soft * 0.3, 'rgba(255,255,255,0.8)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  return new THREE.CanvasTexture(c);
}

function puffTexture() {
  const s = 128;
  const c = document.createElement('canvas');
  c.width = s;
  c.height = s;
  const ctx = c.getContext('2d');
  for (let i = 0; i < 14; i++) {
    const x = s / 2 + (Math.random() - 0.5) * s * 0.4;
    const y = s / 2 + (Math.random() - 0.5) * s * 0.4;
    const r = s * (0.18 + Math.random() * 0.2);
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, 'rgba(255,255,255,0.5)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
  }
  return new THREE.CanvasTexture(c);
}

class ParticlePool {
  constructor(scene, max, texture, additive) {
    this.max = max;
    this.list = [];
    const geo = new THREE.BufferGeometry();
    this.pos = new Float32Array(max * 3);
    this.col = new Float32Array(max * 3);
    this.size = new Float32Array(max);
    this.alpha = new Float32Array(max);
    geo.setAttribute('position', new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('color', new THREE.BufferAttribute(this.col, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('size', new THREE.BufferAttribute(this.size, 1).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('alpha', new THREE.BufferAttribute(this.alpha, 1).setUsage(THREE.DynamicDrawUsage));
    this.geo = geo;
    this.uniforms = { tex: { value: texture }, scale: { value: 500 } };
    const mat = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      transparent: true,
      depthWrite: false,
      blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
      vertexShader: /* glsl */ `
        attribute float size; attribute float alpha; attribute vec3 color;
        uniform float scale;
        varying float vA; varying vec3 vC;
        void main() {
          vA = alpha; vC = color;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * scale / -mv.z;
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: /* glsl */ `
        uniform sampler2D tex;
        varying float vA; varying vec3 vC;
        void main() {
          vec4 t = texture2D(tex, gl_PointCoord);
          gl_FragColor = vec4(vC * t.rgb, t.a * vA);
          #include <colorspace_fragment>
        }`,
    });
    this.points = new THREE.Points(geo, mat);
    this.points.frustumCulled = false;
    this.points.renderOrder = additive ? 12 : 11;
    scene.add(this.points);
  }

  add(p) {
    if (this.list.length >= this.max) this.list.shift();
    p.age = 0;
    this.list.push(p);
  }

  update(dt) {
    let n = 0;
    const keep = [];
    for (const p of this.list) {
      p.age += dt;
      if (p.age >= p.life) continue;
      keep.push(p);
      const t = p.age / p.life;
      p.vy += (p.g || 0) * dt;
      const drag = p.drag ? Math.exp(-p.drag * dt) : 1;
      p.vx *= drag;
      p.vy *= drag;
      p.vz *= drag;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.z += p.vz * dt;
      if (p.floor !== undefined && p.y < p.floor) {
        p.y = p.floor;
        p.vy = 0;
        p.vx *= 0.5;
        p.vz *= 0.5;
      }
      this.pos[n * 3] = p.x;
      this.pos[n * 3 + 1] = p.y;
      this.pos[n * 3 + 2] = p.z;
      const c0 = p.c0;
      const c1 = p.c1 || c0;
      this.col[n * 3] = c0[0] + (c1[0] - c0[0]) * t;
      this.col[n * 3 + 1] = c0[1] + (c1[1] - c0[1]) * t;
      this.col[n * 3 + 2] = c0[2] + (c1[2] - c0[2]) * t;
      this.size[n] = p.s0 + (p.s1 - p.s0) * t;
      const fadeIn = p.fadeIn ? Math.min(1, p.age / p.fadeIn) : 1;
      this.alpha[n] = p.a0 * (1 - t) ** (p.fadePow || 1) * fadeIn;
      n++;
    }
    this.list = keep;
    this.geo.setDrawRange(0, n);
    for (const k of ['position', 'color', 'size', 'alpha']) this.geo.attributes[k].needsUpdate = true;
  }
}

export class Effects {
  constructor(rig, map) {
    this.rig = rig;
    this.map = map;
    const scene = rig.scene;
    this.glow = new ParticlePool(scene, 2600, dotTexture(0), true);
    this.smoke = new ParticlePool(scene, 1600, puffTexture(), false);
    this.buildTracers(scene);
    this.buildRings(scene);
    this.buildRain(scene);
    this.buildClouds(scene);
    this.pending = [];
  }

  buildTracers(scene) {
    const max = 500;
    this.tracerMax = max;
    this.tracers = [];
    this.tPos = new Float32Array(max * 6);
    this.tCol = new Float32Array(max * 6);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(this.tPos, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('color', new THREE.BufferAttribute(this.tCol, 3).setUsage(THREE.DynamicDrawUsage));
    this.tGeo = geo;
    const mat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lines = new THREE.LineSegments(geo, mat);
    lines.frustumCulled = false;
    lines.renderOrder = 13;
    scene.add(lines);
  }

  buildRings(scene) {
    this.rings = [];
    const geo = new THREE.RingGeometry(0.85, 1, 64).rotateX(-Math.PI / 2);
    for (let i = 0; i < 24; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: '#ffffff',
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const m = new THREE.Mesh(geo, mat);
      m.visible = false;
      m.renderOrder = 9;
      scene.add(m);
      this.rings.push({ mesh: m, age: 0, life: 0 });
    }
  }

  buildRain(scene) {
    const n = 2200;
    this.rainN = n;
    this.rainPos = new Float32Array(n * 6);
    this.rainDrops = [];
    for (let i = 0; i < n; i++) this.rainDrops.push({ x: Math.random(), y: Math.random(), z: Math.random() });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(this.rainPos, 3).setUsage(THREE.DynamicDrawUsage));
    const mat = new THREE.LineBasicMaterial({ color: '#c7d3e0', transparent: true, opacity: 0.38, depthWrite: false });
    this.rain = new THREE.LineSegments(geo, mat);
    this.rain.frustumCulled = false;
    this.rain.visible = false;
    this.rainGeo = geo;
    scene.add(this.rain);
  }

  buildClouds(scene) {
    const tex = puffTexture();
    this.clouds = [];
    for (let i = 0; i < 16; i++) {
      const mat = new THREE.SpriteMaterial({
        map: tex,
        color: '#ffffff',
        transparent: true,
        opacity: 0.0,
        depthWrite: false,
        fog: false,
      });
      const s = new THREE.Sprite(mat);
      const size = 380 + Math.random() * 420;
      s.scale.set(size, size * 0.55, 1);
      s.position.set(
        Math.random() * (WORLD.W + 1200) - 600,
        380 + Math.random() * 160,
        Math.random() * (WORLD.H + 800) - 400,
      );
      s.renderOrder = 30;
      scene.add(s);
      this.clouds.push({ sprite: s, speed: 6 + Math.random() * 6, base: 0.5 + Math.random() * 0.35 });
    }
  }

  ground(x, z) {
    return Math.max(WORLD.WATER, this.map.heightAt(x, z));
  }

  muzzle(x, y, z) {
    this.glow.add({
      x,
      y,
      z,
      vx: 0,
      vy: 4,
      vz: 0,
      life: 0.07 + Math.random() * 0.06,
      s0: 5 + Math.random() * 3,
      s1: 3,
      a0: 1,
      c0: [1, 0.88, 0.5],
    });
    if (Math.random() < 0.25) {
      this.smoke.add({
        x,
        y,
        z,
        vx: (Math.random() - 0.5) * 4,
        vy: 3 + Math.random() * 3,
        vz: (Math.random() - 0.5) * 4,
        life: 1.2 + Math.random(),
        s0: 3,
        s1: 12,
        a0: 0.25,
        c0: [0.85, 0.85, 0.82],
        fadeIn: 0.1,
      });
    }
  }

  tracer(a, b, color = [1, 0.85, 0.45], dur = 0.16, onDone = null) {
    if (this.tracers.length >= this.tracerMax) this.tracers.shift();
    this.tracers.push({ a, b, age: 0, dur, color, onDone });
  }

  explosion(x, z, big = false, yOverride = null) {
    const y = yOverride ?? this.ground(x, z) + 1;
    const k = big ? 1.6 : 1;
    this.glow.add({
      x,
      y: y + 4 * k,
      z,
      vx: 0,
      vy: 0,
      vz: 0,
      life: 0.3,
      s0: 20 * k,
      s1: 58 * k,
      a0: 0.8,
      c0: [1, 0.62, 0.22],
      c1: [0.9, 0.25, 0.05],
      fadePow: 1.6,
    });
    for (let i = 0; i < 8 * k; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = 10 + Math.random() * 25;
      this.glow.add({
        x,
        y: y + 2,
        z,
        vx: Math.cos(a) * sp,
        vy: 18 + Math.random() * 30,
        vz: Math.sin(a) * sp,
        g: -30,
        drag: 1.5,
        life: 0.4 + Math.random() * 0.4,
        s0: 10 * k,
        s1: 3,
        a0: 0.9,
        c0: [1, 0.6, 0.2],
        c1: [0.8, 0.15, 0.05],
      });
    }
    for (let i = 0; i < 7 * k; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = 4 + Math.random() * 10;
      const grey = 0.22 + Math.random() * 0.2;
      this.smoke.add({
        x: x + Math.cos(a) * 4,
        y: y + 3,
        z: z + Math.sin(a) * 4,
        vx: Math.cos(a) * sp + 4,
        vy: 8 + Math.random() * 10,
        vz: Math.sin(a) * sp,
        drag: 0.6,
        life: 2.6 + Math.random() * 2.2,
        s0: 14 * k,
        s1: 56 * k,
        a0: 0.85,
        c0: [grey, grey * 0.95, grey * 0.9],
        c1: [0.5, 0.5, 0.5],
        fadeIn: 0.15,
      });
    }
    for (let i = 0; i < 10 * k; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = 15 + Math.random() * 30;
      this.smoke.add({
        x,
        y: y + 2,
        z,
        vx: Math.cos(a) * sp,
        vy: 30 + Math.random() * 40,
        vz: Math.sin(a) * sp,
        g: -110,
        life: 0.9 + Math.random() * 0.4,
        s0: 2.6,
        s1: 2.2,
        a0: 0.9,
        c0: [0.22, 0.18, 0.12],
        floor: y,
      });
    }
    this.onBoom?.(x, z, big);
    const d = Math.hypot(this.rig.camera.position.x - x, this.rig.camera.position.z - z);
    if (d < 700) this.rig.shake = Math.max(this.rig.shake, (big ? 5 : 2.5) * (1 - d / 700));
  }

  shell(x, z) {
    const y = this.ground(x, z);
    const from = [x - 120 + Math.random() * 60, y + 380, z - 60 + Math.random() * 40];
    this.tracer(from, [x, y + 2, z], [1, 0.7, 0.35], 0.5, () => this.explosion(x, z, Math.random() < 0.4));
  }

  dust(x, z) {
    const y = this.ground(x, z) + 1;
    this.smoke.add({
      x: x + (Math.random() - 0.5) * 20,
      y,
      z: z + (Math.random() - 0.5) * 20,
      vx: (Math.random() - 0.5) * 4,
      vy: 3,
      vz: (Math.random() - 0.5) * 4,
      life: 1.8,
      s0: 9,
      s1: 30,
      a0: 0.35,
      c0: [0.62, 0.55, 0.42],
      fadeIn: 0.2,
    });
  }

  ring(x, z, side, size = 80) {
    const r = this.rings.find((o) => !o.mesh.visible) || this.rings[0];
    r.mesh.visible = true;
    r.mesh.material.color.set(SIDES[side].color);
    r.mesh.position.set(x, this.ground(x, z) + 3, z);
    r.age = 0;
    r.life = 1.3;
    r.size = size;
  }

  update(dt, now, weather) {
    this.glow.uniforms.scale.value = this.rig.height / (2 * Math.tan((this.rig.camera.fov * Math.PI) / 360));
    this.smoke.uniforms.scale.value = this.glow.uniforms.scale.value;
    this.glow.update(dt);
    this.smoke.update(dt);
    // tracers
    let n = 0;
    const keep = [];
    for (const t of this.tracers) {
      t.age += dt;
      const k = t.age / t.dur;
      if (k >= 1) {
        if (t.onDone) t.onDone();
        continue;
      }
      keep.push(t);
      const h = k;
      const tl = Math.max(0, k - 0.3);
      for (let j = 0; j < 3; j++) {
        this.tPos[n * 6 + j] = t.a[j] + (t.b[j] - t.a[j]) * tl;
        this.tPos[n * 6 + 3 + j] = t.a[j] + (t.b[j] - t.a[j]) * h;
        this.tCol[n * 6 + j] = t.color[j] * 0.15;
        this.tCol[n * 6 + 3 + j] = t.color[j];
      }
      n++;
    }
    this.tracers = keep;
    this.tGeo.setDrawRange(0, n * 2);
    this.tGeo.attributes.position.needsUpdate = true;
    this.tGeo.attributes.color.needsUpdate = true;
    // rings
    for (const r of this.rings) {
      if (!r.mesh.visible) continue;
      r.age += dt;
      const t = r.age / r.life;
      if (t >= 1) {
        r.mesh.visible = false;
        continue;
      }
      const s = r.size * (0.2 + t * 0.9);
      r.mesh.scale.set(s, 1, s);
      r.mesh.material.opacity = (1 - t) * 0.8;
    }
    // rain
    const raining = weather === 'rain';
    this.rain.visible = raining;
    if (raining) {
      const cx = this.rig.cam.x;
      const cz = this.rig.cam.z;
      const span = Math.min(2400, this.rig.cam.dist * 1.6);
      const base = this.rig.targetH;
      const top = this.rig.cam.dist * 0.9;
      for (let i = 0; i < this.rainN; i++) {
        const d = this.rainDrops[i];
        d.y -= dt * 1.1;
        if (d.y < 0) {
          d.y += 1;
          d.x = Math.random();
          d.z = Math.random();
        }
        const x = cx + (d.x - 0.5) * span;
        const z = cz + (d.z - 0.5) * span;
        const y = base + d.y * top;
        this.rainPos[i * 6] = x;
        this.rainPos[i * 6 + 1] = y;
        this.rainPos[i * 6 + 2] = z;
        this.rainPos[i * 6 + 3] = x + 2;
        this.rainPos[i * 6 + 4] = y + 16;
        this.rainPos[i * 6 + 5] = z + 1;
      }
      this.rainGeo.attributes.position.needsUpdate = true;
    }
    // clouds drift; visible from high up
    const dist = this.rig.cam.dist;
    const vis = Math.min(1, Math.max(0, (dist - 1500) / 1200));
    const overcast = weather === 'rain' ? 1.3 : weather === 'fog' ? 1.1 : 1;
    for (const c of this.clouds) {
      c.sprite.position.x += c.speed * dt;
      if (c.sprite.position.x > WORLD.W + 700) c.sprite.position.x = -700;
      c.sprite.material.opacity = Math.min(0.4, vis * c.base * overcast * 0.32);
      c.sprite.material.color.set(weather === 'rain' ? '#9aa3ab' : '#ffffff');
    }
  }
}
