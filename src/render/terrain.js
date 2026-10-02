// Terrain mesh, painted ground texture, territory tint and water.

import * as THREE from 'three';
import { WORLD, SIDES, LOCATIONS } from '../data/config.js';
import { clamp, lerp, smoothstep, distToPolyline } from '../core/util.js';
import { Rng } from '../core/rng.js';
import { SUN_DIR } from './scene.js';

const { W, H, MARGIN: M, HM_STEP, WATER } = WORLD;
const WT = W + 2 * M;
const HT = H + 2 * M;

const mix3 = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];

// Continuous forest field shared by ground painting and tree placement.
export function forestField(map, x, y, h) {
  let f = map.noise3.fbm(x / 420 + 11, y / 420 + 4, 4) + (h > 30 ? 0.12 : 0);
  for (const l of map.locations) {
    if (l.type === 'bridge') continue;
    const r = l.type === 'capital' ? 90 : l.type === 'city' ? 75 : l.type === 'fort' ? 65 : 45;
    const d = Math.hypot(x - l.x, y - l.y);
    if (d < r * 1.7) f -= 0.45 * (1 - smoothstep(r * 0.7, r * 1.7, d));
  }
  return f;
}

function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}

export class Terrain {
  constructor(rig, map, opts = {}) {
    this.rig = rig;
    this.map = map;
    this.texSize = opts.texSize || 3072;
    this.buildGeometry();
    this.paintBase();
    this.buildOwnership();
    this.buildDetail();
    this.buildMesh();
    this.buildWater();
    this.flashes = [];
    this.ownVersion = -1;
    this.lastOwnDraw = 0;
  }

  buildGeometry() {
    const map = this.map;
    const gw = map.hmW;
    const gh = map.hmH;
    const pos = new Float32Array(gw * gh * 3);
    const uv = new Float32Array(gw * gh * 2);
    for (let j = 0; j < gh; j++) {
      for (let i = 0; i < gw; i++) {
        const k = j * gw + i;
        pos[k * 3] = -M + i * HM_STEP;
        pos[k * 3 + 1] = map.hm[k];
        pos[k * 3 + 2] = -M + j * HM_STEP;
        uv[k * 2] = i / (gw - 1);
        uv[k * 2 + 1] = 1 - j / (gh - 1);
      }
    }
    const idx = new Uint32Array((gw - 1) * (gh - 1) * 6);
    let p = 0;
    for (let j = 0; j < gh - 1; j++) {
      for (let i = 0; i < gw - 1; i++) {
        const a = j * gw + i;
        const b = a + 1;
        const c = a + gw;
        const d = c + 1;
        // diagonal c-b matches GameMap.heightAt
        idx[p++] = a;
        idx[p++] = c;
        idx[p++] = b;
        idx[p++] = c;
        idx[p++] = d;
        idx[p++] = b;
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    geo.setIndex(new THREE.BufferAttribute(idx, 1));
    geo.computeVertexNormals();
    geo.computeBoundingSphere();
    this.geometry = geo;
  }

  // Ground colors from height, slope, forest and noise; then fields, roads, rivers.
  paintBase() {
    const map = this.map;
    const texW = this.texSize;
    const texH = Math.round((texW * HT) / WT);
    const lw = Math.round(texW / 2.4);
    const lh = Math.round(texH / 2.4);
    const low = makeCanvas(lw, lh);
    const lctx = low.getContext('2d');
    const img = lctx.createImageData(lw, lh);
    const data = img.data;
    const n = map.noise;
    const n2 = map.noise2;
    const grassA = [104, 136, 62];
    const grassB = [152, 152, 84];
    const forest = [52, 80, 40];
    const rock = [122, 112, 98];
    const rockDark = [88, 80, 72];
    const snow = [238, 242, 246];
    const sand = [206, 192, 142];
    const seabed = [96, 118, 104];
    const deep = [52, 78, 88];
    for (let py = 0; py < lh; py++) {
      const wy = -M + ((py + 0.5) / lh) * HT;
      for (let px = 0; px < lw; px++) {
        const wx = -M + ((px + 0.5) / lw) * WT;
        const h = map.heightAt(wx, wy);
        const hx = map.heightAt(wx + 5, wy) - h;
        const hy = map.heightAt(wx, wy + 5) - h;
        const slope = Math.hypot(hx, hy) / 5;
        const n1 = n.fbm(wx / 190, wy / 190, 3);
        const g = n2.get(wx / 22, wy / 22);
        let col = mix3(grassA, grassB, smoothstep(-0.35, 0.55, n1));
        const f = forestField(map, wx, wy, h);
        const ft = smoothstep(0.12, 0.22, f) * (1 - smoothstep(70, 110, h));
        col = mix3(col, forest, ft * 0.9);
        const rt = Math.max(smoothstep(48, 92, h + n1 * 14), smoothstep(0.75, 1.5, slope));
        col = mix3(col, mix3(rock, rockDark, g * 0.5 + 0.5), rt);
        const st = smoothstep(140, 178, h + n1 * 22) * (1 - smoothstep(1.3, 2.4, slope));
        col = mix3(col, snow, st);
        const sd = 1 - smoothstep(WATER + 0.6, WATER + 4.5, h);
        col = mix3(col, sand, sd);
        if (h < WATER) col = mix3(seabed, deep, smoothstep(0, 18, WATER - h));
        const b = 1 + g * 0.07;
        const o = (py * lw + px) * 4;
        data[o] = clamp(col[0] * b, 0, 255);
        data[o + 1] = clamp(col[1] * b, 0, 255);
        data[o + 2] = clamp(col[2] * b, 0, 255);
        data[o + 3] = 255;
      }
    }
    lctx.putImageData(img, 0, 0);

    const canvas = makeCanvas(texW, texH);
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(low, 0, 0, texW, texH);
    const s = texW / WT;
    ctx.setTransform(s, 0, 0, s, M * s, M * s);
    this.paintFields(ctx);
    this.paintTowns(ctx);
    this.paintRivers(ctx);
    this.paintRoads(ctx);
    this.paintBorders(ctx);
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = Math.min(8, this.rig.renderer.capabilities.getMaxAnisotropy());
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    this.baseTex = tex;
    this.baseCanvas = canvas;
  }

  paintFields(ctx) {
    const map = this.map;
    const rng = new Rng(map.seed * 7 + 11);
    const palette = [
      'rgba(214,190,108,0.55)', 'rgba(150,176,86,0.5)', 'rgba(146,112,74,0.5)',
      'rgba(190,172,98,0.55)', 'rgba(124,156,72,0.5)', 'rgba(200,160,90,0.45)',
    ];
    for (const l of map.locations) {
      if (l.type === 'bridge' || l.type === 'fort') continue;
      const count = l.type === 'capital' ? 70 : l.type === 'city' ? 46 : 22;
      const r0 = l.type === 'capital' ? 70 : l.type === 'city' ? 58 : 34;
      const r1 = l.type === 'capital' ? 220 : l.type === 'city' ? 175 : 115;
      const ang0 = rng.float(0, Math.PI);
      for (let i = 0; i < count; i++) {
        const a = rng.float(0, Math.PI * 2);
        const r = rng.float(r0, r1);
        const x = l.x + Math.cos(a) * r;
        const y = l.y + Math.sin(a) * r;
        if (x < 10 || y < 10 || x > W - 10 || y > H - 10) continue;
        const h = map.heightAt(x, y);
        if (h < WATER + 3 || h > 55) continue;
        if (forestField(map, x, y, h) > 0.1) continue;
        let nearRiver = false;
        for (const rv of map.rivers) if (distToPolyline(x, y, rv.pts) < 22) nearRiver = true;
        if (nearRiver) continue;
        const w = rng.float(20, 46);
        const hh = rng.float(12, 28);
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(ang0 + rng.int(0, 1) * Math.PI / 2 + rng.float(-0.15, 0.15));
        ctx.fillStyle = rng.pick(palette);
        ctx.fillRect(-w / 2, -hh / 2, w, hh);
        ctx.strokeStyle = 'rgba(60,72,36,0.35)';
        ctx.lineWidth = 1.2;
        ctx.strokeRect(-w / 2, -hh / 2, w, hh);
        // furrows
        ctx.strokeStyle = 'rgba(80,70,40,0.12)';
        ctx.lineWidth = 0.7;
        for (let k = -w / 2 + 3; k < w / 2; k += 3.5) {
          ctx.beginPath();
          ctx.moveTo(k, -hh / 2);
          ctx.lineTo(k, hh / 2);
          ctx.stroke();
        }
        ctx.restore();
      }
    }
  }

  paintTowns(ctx) {
    for (const l of this.map.locations) {
      if (l.type === 'bridge') continue;
      const r = l.type === 'capital' ? 64 : l.type === 'city' ? 48 : l.type === 'fort' ? 44 : 24;
      const g = ctx.createRadialGradient(l.x, l.y, 0, l.x, l.y, r);
      g.addColorStop(0, 'rgba(150,134,108,0.85)');
      g.addColorStop(0.7, 'rgba(150,134,108,0.55)');
      g.addColorStop(1, 'rgba(150,134,108,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(l.x, l.y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  paintRivers(ctx) {
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    for (const r of this.map.rivers) {
      const path = () => {
        ctx.beginPath();
        r.pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
      };
      path();
      ctx.strokeStyle = 'rgba(92,84,56,0.55)';
      ctx.lineWidth = 22;
      ctx.stroke();
      path();
      ctx.strokeStyle = 'rgb(58,98,112)';
      ctx.lineWidth = 12;
      ctx.stroke();
    }
  }

  paintRoads(ctx) {
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    const draw = (major, width, style) => {
      for (const r of this.map.roads) {
        if (r.major !== major) continue;
        ctx.beginPath();
        r.pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
        ctx.strokeStyle = style;
        ctx.lineWidth = width;
        ctx.stroke();
      }
    };
    draw(false, 4.2, 'rgba(70,56,38,0.45)');
    draw(false, 2.4, 'rgba(196,176,132,0.9)');
    draw(true, 7, 'rgba(64,50,34,0.55)');
    draw(true, 4.2, 'rgb(212,192,146)');
    draw(true, 1, 'rgba(160,140,100,0.6)');
  }

  paintBorders(ctx) {
    ctx.strokeStyle = 'rgba(30,26,16,0.10)';
    ctx.lineWidth = 1.1;
    for (const c of this.map.cells) {
      if (!c.passable) continue;
      ctx.beginPath();
      c.poly.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
      ctx.closePath();
      ctx.stroke();
    }
  }

  buildOwnership() {
    const ow = 1024;
    const oh = Math.round((ow * HT) / WT);
    this.ownCanvas = makeCanvas(ow, oh);
    this.ownCtx = this.ownCanvas.getContext('2d');
    this.ownScale = ow / WT;
    const tex = new THREE.CanvasTexture(this.ownCanvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    this.ownTex = tex;
  }

  drawOwnership(now) {
    const ctx = this.ownCtx;
    const s = this.ownScale;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, this.ownCanvas.width, this.ownCanvas.height);
    ctx.setTransform(s, 0, 0, s, M * s, M * s);
    const map = this.map;
    for (const side of [0, 1]) {
      const t = SIDES[side].tint;
      ctx.fillStyle = `rgba(${t[0]},${t[1]},${t[2]},${side === 0 ? 0.26 : 0.3})`;
      ctx.beginPath();
      for (const c of map.cells) {
        if (c.owner !== side) continue;
        c.poly.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
        ctx.closePath();
      }
      ctx.fill();
    }
    // freshly captured ground flashes
    this.flashes = this.flashes.filter((f) => now - f.t < 1.6);
    for (const f of this.flashes) {
      const a = 1 - (now - f.t) / 1.6;
      const c = map.cells[f.cell];
      const t = SIDES[f.side].tint;
      ctx.fillStyle = `rgba(${Math.min(255, t[0] + 90)},${Math.min(255, t[1] + 90)},${Math.min(255, t[2] + 90)},${0.7 * a})`;
      ctx.beginPath();
      c.poly.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
      ctx.closePath();
      ctx.fill();
    }
    this.ownTex.needsUpdate = true;
  }

  flash(cell, side, now) {
    this.flashes.push({ cell, side, t: now });
  }

  update(now, version) {
    const needs = version !== this.ownVersion || this.flashes.length > 0;
    if (needs && now - this.lastOwnDraw > 1 / 12) {
      this.drawOwnership(now);
      this.ownVersion = version;
      this.lastOwnDraw = now;
    }
    this.waterMat.uniforms.time.value = now;
  }

  buildDetail() {
    const size = 256;
    const c = makeCanvas(size, size);
    const ctx = c.getContext('2d');
    const img = ctx.createImageData(size, size);
    const rng = new Rng(99);
    // tileable value noise by summing wrapped octaves
    const grid = (cells) => {
      const g = new Float32Array(cells * cells);
      for (let i = 0; i < g.length; i++) g[i] = rng.next();
      return (x, y) => {
        const fx = (x / size) * cells;
        const fy = (y / size) * cells;
        const ix = Math.floor(fx);
        const iy = Math.floor(fy);
        const tx = fx - ix;
        const ty = fy - iy;
        const at = (a, b) => g[((b % cells) + cells) % cells * cells + (((a % cells) + cells) % cells)];
        const sx = tx * tx * (3 - 2 * tx);
        const sy = ty * ty * (3 - 2 * ty);
        return lerp(lerp(at(ix, iy), at(ix + 1, iy), sx), lerp(at(ix, iy + 1), at(ix + 1, iy + 1), sx), sy);
      };
    };
    const o1 = grid(8);
    const o2 = grid(16);
    const o3 = grid(32);
    const o4 = grid(64);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const v = o1(x, y) * 0.4 + o2(x, y) * 0.3 + o3(x, y) * 0.2 + o4(x, y) * 0.1;
        const k = (y * size + x) * 4;
        const b = clamp(v * 255, 0, 255);
        img.data[k] = b;
        img.data[k + 1] = b;
        img.data[k + 2] = b;
        img.data[k + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.colorSpace = THREE.NoColorSpace;
    this.detailTex = tex;
  }

  buildMesh() {
    const mat = new THREE.MeshStandardMaterial({
      map: this.baseTex,
      roughness: 0.94,
      metalness: 0.0,
    });
    const ownTex = this.ownTex;
    const detailTex = this.detailTex;
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.ownMap = { value: ownTex };
      shader.uniforms.detailMap = { value: detailTex };
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', '#include <common>\nvarying vec3 vWPos;')
        .replace('#include <begin_vertex>', '#include <begin_vertex>\nvWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;');
      shader.fragmentShader = shader.fragmentShader
        .replace('#include <common>', '#include <common>\nuniform sampler2D ownMap;\nuniform sampler2D detailMap;\nvarying vec3 vWPos;')
        .replace(
          '#include <map_fragment>',
          `#include <map_fragment>
          float det = texture2D(detailMap, vWPos.xz * 0.019).r * 0.55 + texture2D(detailMap, vWPos.xz * 0.0043).r * 0.45;
          diffuseColor.rgb *= 0.8 + det * 0.4;
          vec4 own = texture2D(ownMap, vMapUv);
          diffuseColor.rgb = mix(diffuseColor.rgb, own.rgb, own.a);`,
        );
    };
    const mesh = new THREE.Mesh(this.geometry, mat);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    this.mesh = mesh;
    this.rig.scene.add(mesh);
  }

  buildWater() {
    const map = this.map;
    // heightmap as a texture so the water knows its depth
    const gw = map.hmW;
    const gh = map.hmH;
    const data = new Uint8Array(gw * gh * 4);
    for (let j = 0; j < gh; j++) {
      for (let i = 0; i < gw; i++) {
        const k = j * gw + i;
        const v = clamp((map.hm[k] + 60) / 300, 0, 1) * 255;
        const o = ((gh - 1 - j) * gw + i) * 4;
        data[o] = v;
        data[o + 1] = v;
        data[o + 2] = v;
        data[o + 3] = 255;
      }
    }
    const hTex = new THREE.DataTexture(data, gw, gh, THREE.RGBAFormat);
    hTex.minFilter = THREE.LinearFilter;
    hTex.magFilter = THREE.LinearFilter;
    hTex.needsUpdate = true;
    const size = 16000;
    const geo = new THREE.PlaneGeometry(size, size, 1, 1);
    geo.rotateX(-Math.PI / 2);
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      fog: true,
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.fog,
        {
          time: { value: 0 },
          hTex: { value: hTex },
          sunDir: { value: SUN_DIR },
          deep: { value: new THREE.Color('#1d4a5e') },
          shallow: { value: new THREE.Color('#3f8a8f') },
          sky: { value: new THREE.Color('#a9c7d8') },
          bounds: { value: new THREE.Vector4(-M, -M, WT, HT) },
        },
      ]),
      vertexShader: /* glsl */ `
        varying vec3 vW;
        #include <fog_pars_vertex>
        void main() {
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vW = wp.xyz;
          vec4 mvPosition = viewMatrix * wp;
          gl_Position = projectionMatrix * mvPosition;
          #include <fog_vertex>
        }`,
      fragmentShader: /* glsl */ `
        uniform float time; uniform sampler2D hTex; uniform vec3 sunDir;
        uniform vec3 deep; uniform vec3 shallow; uniform vec3 sky; uniform vec4 bounds;
        varying vec3 vW;
        #include <fog_pars_fragment>
        float wave(vec2 p) {
          return sin(p.x * 0.045 + time * 0.9) * 0.5 + sin(p.y * 0.061 - time * 0.7) * 0.5
               + sin((p.x + p.y) * 0.13 + time * 1.4) * 0.22 + sin((p.x * 0.6 - p.y) * 0.27 - time * 1.9) * 0.1;
        }
        void main() {
          vec2 p = vW.xz;
          vec2 uv = (p - bounds.xy) / bounds.zw;
          float ground = texture2D(hTex, vec2(uv.x, 1.0 - uv.y)).r * 300.0 - 60.0;
          if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) ground = -60.0;
          float depth = ${WATER.toFixed(1)} - ground;
          if (depth < -0.5) discard;
          float e = 1.5;
          vec3 n = normalize(vec3(wave(p - vec2(e, 0.0)) - wave(p + vec2(e, 0.0)), 3.2, wave(p - vec2(0.0, e)) - wave(p + vec2(0.0, e))));
          vec3 v = normalize(cameraPosition - vW);
          float fres = pow(1.0 - max(dot(n, v), 0.0), 3.0);
          vec3 col = mix(shallow, deep, smoothstep(0.0, 14.0, depth));
          col = mix(col, sky, 0.12 + fres * 0.55);
          vec3 r = reflect(-sunDir, n);
          col += vec3(1.0, 0.92, 0.75) * pow(max(dot(r, v), 0.0), 90.0) * 1.3;
          float foam = (1.0 - smoothstep(0.0, 1.6, depth)) * (0.55 + 0.45 * sin(time * 2.0 + p.x * 0.2 + p.y * 0.17));
          col = mix(col, vec3(0.92, 0.95, 0.95), foam * 0.55);
          float alpha = mix(0.55, 0.96, smoothstep(0.0, 9.0, depth));
          gl_FragColor = vec4(col, alpha);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
          #include <fog_fragment>
        }`,
    });
    const water = new THREE.Mesh(geo, mat);
    water.position.set(W / 2, WATER, H / 2);
    water.renderOrder = 1;
    this.waterMat = mat;
    this.water = water;
    this.rig.scene.add(water);
  }
}

export { LOCATIONS };
