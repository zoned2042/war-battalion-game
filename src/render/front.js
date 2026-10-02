// The front line: a glowing animated ribbon draped over the terrain plus a
// translucent curtain of light so it reads at any zoom level.

import * as THREE from 'three';
import { resample } from '../core/util.js';
import { WORLD } from '../data/config.js';

const RIBBON_VS = /* glsl */ `
  attribute vec2 rib; // x: distance along, y: across (-1..1)
  varying vec2 vRib;
  #include <fog_pars_vertex>
  void main() {
    vRib = rib;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    #include <fog_vertex>
  }`;

const CORE_FS = /* glsl */ `
  uniform float time;
  varying vec2 vRib;
  #include <fog_pars_fragment>
  void main() {
    float a = abs(vRib.y);
    float edge = smoothstep(0.5, 0.7, a);
    float flow = 0.5 + 0.5 * sin(vRib.x * 0.09 - time * 4.0);
    vec3 core = mix(vec3(1.0, 0.42, 0.08), vec3(1.0, 0.86, 0.45), flow * flow);
    vec3 col = mix(core * 1.35, vec3(0.12, 0.05, 0.02), edge);
    float alpha = 1.0 - smoothstep(0.92, 1.0, a);
    gl_FragColor = vec4(col, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    #include <fog_fragment>
  }`;

const GLOW_FS = /* glsl */ `
  uniform float time; uniform float strength;
  varying vec2 vRib;
  void main() {
    float a = 1.0 - abs(vRib.y);
    float pulse = 0.75 + 0.25 * sin(vRib.x * 0.035 - time * 2.2);
    float g = a * a * pulse * strength;
    gl_FragColor = vec4(vec3(1.0, 0.45, 0.12) * g, 1.0);
  }`;

const CURTAIN_FS = /* glsl */ `
  uniform float time; uniform float strength;
  varying vec2 vRib;
  void main() {
    float h = vRib.y; // 0 bottom .. 1 top
    float bands = 0.6 + 0.4 * sin(vRib.x * 0.06 - time * 3.0 + h * 4.0);
    float a = (1.0 - h) * (1.0 - h) * bands * strength;
    gl_FragColor = vec4(vec3(1.0, 0.5, 0.18) * a, 1.0);
  }`;

export class FrontLine {
  constructor(rig, map) {
    this.rig = rig;
    this.map = map;
    this.time = { value: 0 };
    this.glowStrength = { value: 0.5 };
    this.curtainStrength = { value: 0.35 };
    const fogU = THREE.UniformsUtils.clone(THREE.UniformsLib.fog);
    this.coreMat = new THREE.ShaderMaterial({
      uniforms: { ...fogU, time: this.time },
      vertexShader: RIBBON_VS,
      fragmentShader: CORE_FS,
      transparent: true,
      fog: true,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -4,
      polygonOffsetUnits: -4,
    });
    this.glowMat = new THREE.ShaderMaterial({
      uniforms: { time: this.time, strength: this.glowStrength },
      vertexShader: RIBBON_VS.replace('#include <fog_pars_vertex>', '').replace('#include <fog_vertex>', ''),
      fragmentShader: GLOW_FS,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -3,
      polygonOffsetUnits: -3,
    });
    this.curtainMat = new THREE.ShaderMaterial({
      uniforms: { time: this.time, strength: this.curtainStrength },
      vertexShader: RIBBON_VS.replace('#include <fog_pars_vertex>', '').replace('#include <fog_vertex>', ''),
      fragmentShader: CURTAIN_FS,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    this.core = new THREE.Mesh(new THREE.BufferGeometry(), this.coreMat);
    this.glow = new THREE.Mesh(new THREE.BufferGeometry(), this.glowMat);
    this.curtain = new THREE.Mesh(new THREE.BufferGeometry(), this.curtainMat);
    for (const m of [this.core, this.glow, this.curtain]) {
      m.frustumCulled = false;
      rig.scene.add(m);
    }
    this.core.renderOrder = 8;
    this.glow.renderOrder = 7;
    this.curtain.renderOrder = 14;
    this.version = -1;
  }

  h(x, y) {
    return Math.max(WORLD.WATER + 0.5, this.map.heightAt(x, y));
  }

  ribbon(lines, width, lift) {
    const pos = [];
    const rib = [];
    const idx = [];
    for (const line of lines) {
      const pts = resample(line.pts, 6);
      if (pts.length < 2) continue;
      const base = pos.length / 3;
      let along = 0;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const a = pts[Math.max(0, i - 1)];
        const b = pts[Math.min(pts.length - 1, i + 1)];
        let tx = b[0] - a[0];
        let ty = b[1] - a[1];
        const L = Math.hypot(tx, ty) || 1;
        tx /= L;
        ty /= L;
        const nx = -ty;
        const ny = tx;
        if (i > 0) along += Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]);
        for (const s of [-1, 1]) {
          const x = p[0] + nx * s * width * 0.5;
          const y = p[1] + ny * s * width * 0.5;
          pos.push(x, this.h(x, y) + lift, y);
          rib.push(along, s);
        }
        if (i > 0) {
          const k = base + i * 2;
          idx.push(k - 2, k - 1, k, k - 1, k + 1, k);
        }
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('rib', new THREE.Float32BufferAttribute(rib, 2));
    geo.setIndex(idx);
    return geo;
  }

  wall(lines, height) {
    const pos = [];
    const rib = [];
    const idx = [];
    for (const line of lines) {
      const pts = resample(line.pts, 10);
      if (pts.length < 2) continue;
      const base = pos.length / 3;
      let along = 0;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        if (i > 0) along += Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]);
        const g = this.h(p[0], p[1]);
        pos.push(p[0], g + 1, p[1], p[0], g + height, p[1]);
        rib.push(along, 0, along, 1);
        if (i > 0) {
          const k = base + i * 2;
          idx.push(k - 2, k - 1, k, k - 1, k + 1, k);
        }
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('rib', new THREE.Float32BufferAttribute(rib, 2));
    geo.setIndex(idx);
    return geo;
  }

  rebuild(lines, ws) {
    for (const m of [this.core, this.glow, this.curtain]) m.geometry.dispose();
    this.core.geometry = this.ribbon(lines, 6 * ws, 1.6);
    this.glow.geometry = this.ribbon(lines, 46 * ws, 1.2);
    this.curtain.geometry = this.wall(lines, 30 * Math.sqrt(ws));
  }

  update(now, territory, camDist) {
    // the ribbon widens when zoomed out so the front always reads
    const ws = Math.round(Math.min(3.2, Math.max(1, camDist / 750)) * 4) / 4;
    if (territory.version !== this.version || ws !== this.ws) {
      this.version = territory.version;
      this.ws = ws;
      this.rebuild(territory.frontLines(), ws);
    }
    this.time.value = now;
    const z = Math.min(1, Math.max(0, (camDist - 300) / 1800));
    this.glowStrength.value = 0.4 + z * 0.45;
    this.curtainStrength.value = 0.3 + z * 0.35;
  }
}
