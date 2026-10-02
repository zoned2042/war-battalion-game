// Renderer, lights, sky and the strategy camera.

import * as THREE from 'three';
import { clamp, lerp, smoothstep } from '../core/util.js';
import { WORLD } from '../data/config.js';

export const SUN_DIR = new THREE.Vector3(-0.45, 0.82, 0.38).normalize();

export class SceneRig {
  constructor(canvas, map) {
    this.map = map;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer = renderer;

    const scene = new THREE.Scene();
    this.fogColor = new THREE.Color('#c9d6dc');
    scene.fog = new THREE.Fog(this.fogColor, 2000, 7000);
    scene.background = this.fogColor.clone();
    this.scene = scene;

    this.camera = new THREE.PerspectiveCamera(42, 1, 2, 14000);

    // light
    const hemi = new THREE.HemisphereLight('#cfe3ff', '#5a5040', 1.25);
    scene.add(hemi);
    this.hemi = hemi;
    const sun = new THREE.DirectionalLight('#fff1d6', 2.6);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.bias = -0.0004;
    sun.shadow.normalBias = 1.2;
    sun.shadow.camera.near = 10;
    sun.shadow.camera.far = 5000;
    scene.add(sun);
    scene.add(sun.target);
    this.sun = sun;

    this.buildSky();

    // camera state: target on the ground, distance, yaw
    this.cam = { x: 1480, z: 1000, dist: 1500, yaw: 0 };
    this.want = { ...this.cam };
    this.minDist = 170;
    this.maxDist = 2700;
    this.targetH = 10;
    this.shake = 0;
    this.raycaster = new THREE.Raycaster();
    this.tmpV = new THREE.Vector3();
    this.resize();
  }

  buildSky() {
    const geo = new THREE.SphereGeometry(9000, 32, 16);
    const mat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
      uniforms: {
        top: { value: new THREE.Color('#5f93c9') },
        horizon: { value: new THREE.Color('#d9e4ea') },
        sunDir: { value: SUN_DIR },
      },
      vertexShader: /* glsl */ `
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          vec4 p = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * p;
        }`,
      fragmentShader: /* glsl */ `
        uniform vec3 top; uniform vec3 horizon; uniform vec3 sunDir;
        varying vec3 vDir;
        void main() {
          float h = clamp(vDir.y, 0.0, 1.0);
          vec3 col = mix(horizon, top, pow(h, 0.55));
          float s = max(dot(normalize(vDir), sunDir), 0.0);
          col += vec3(1.0, 0.85, 0.6) * pow(s, 64.0) * 0.6;
          gl_FragColor = vec4(col, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`,
    });
    this.sky = new THREE.Mesh(geo, mat);
    this.sky.renderOrder = -10;
    this.scene.add(this.sky);
  }

  resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.width = w;
    this.height = h;
  }

  pitchFor(dist) {
    return lerp(0.52, 1.12, smoothstep(this.minDist, this.maxDist * 0.85, dist));
  }

  // Place the camera from the smoothed state.
  updateCamera(dt) {
    const k = 1 - Math.exp(-dt * 9);
    const c = this.cam;
    const w = this.want;
    w.x = clamp(w.x, -100, WORLD.W + 100);
    w.z = clamp(w.z, -100, WORLD.H + 100);
    w.dist = clamp(w.dist, this.minDist, this.maxDist);
    c.x = lerp(c.x, w.x, k);
    c.z = lerp(c.z, w.z, k);
    c.dist = lerp(c.dist, w.dist, k);
    let dy = w.yaw - c.yaw;
    c.yaw += dy * k;
    const gh = Math.max(WORLD.WATER, this.map.heightAt(c.x, c.z));
    this.targetH = lerp(this.targetH, gh, 1 - Math.exp(-dt * 3));
    const p = this.pitchFor(c.dist);
    const cp = Math.cos(p);
    let px = c.x + Math.sin(c.yaw) * cp * c.dist;
    let pz = c.z + Math.cos(c.yaw) * cp * c.dist;
    let py = this.targetH + Math.sin(p) * c.dist;
    const ground = this.map.heightAt(px, pz);
    if (py < ground + 25) py = ground + 25;
    if (this.shake > 0) {
      const s = this.shake * Math.min(1, 900 / c.dist);
      px += (Math.random() - 0.5) * s;
      py += (Math.random() - 0.5) * s;
      pz += (Math.random() - 0.5) * s;
      this.shake = Math.max(0, this.shake - dt * 14);
    }
    this.camera.position.set(px, py, pz);
    this.camera.lookAt(c.x, this.targetH, c.z);

    // fog scales with zoom so distant land fades into haze
    this.scene.fog.near = c.dist * 1.1;
    this.scene.fog.far = c.dist * 3.2 + 1200;

    // shadow frustum follows the view
    const ext = clamp(c.dist * 0.85, 280, 1700);
    const sc = this.sun.shadow.camera;
    sc.left = -ext;
    sc.right = ext;
    sc.top = ext;
    sc.bottom = -ext;
    sc.updateProjectionMatrix();
    this.sun.position.set(c.x + SUN_DIR.x * 2200, this.targetH + SUN_DIR.y * 2200, c.z + SUN_DIR.z * 2200);
    this.sun.target.position.set(c.x, this.targetH, c.z);
    this.sun.target.updateMatrixWorld();
    this.sky.position.copy(this.camera.position);
  }

  // Screen point -> ground point by marching the ray over the heightmap.
  groundAt(sx, sy) {
    const ndc = new THREE.Vector2((sx / this.width) * 2 - 1, -(sy / this.height) * 2 + 1);
    this.raycaster.setFromCamera(ndc, this.camera);
    const o = this.raycaster.ray.origin;
    const d = this.raycaster.ray.direction;
    if (d.y >= -0.01) return null;
    const map = this.map;
    let t = 0;
    const step = 6;
    let prevT = 0;
    const maxT = 20000;
    while (t < maxT) {
      const x = o.x + d.x * t;
      const y = o.y + d.y * t;
      const z = o.z + d.z * t;
      const h = Math.max(WORLD.WATER, map.heightAt(x, z));
      if (y <= h) {
        let lo = prevT;
        let hi = t;
        for (let i = 0; i < 12; i++) {
          const mid = (lo + hi) / 2;
          const my = o.y + d.y * mid;
          const mh = Math.max(WORLD.WATER, map.heightAt(o.x + d.x * mid, o.z + d.z * mid));
          if (my <= mh) hi = mid;
          else lo = mid;
        }
        return { x: o.x + d.x * hi, z: o.z + d.z * hi };
      }
      prevT = t;
      // bigger steps while far above the terrain
      t += Math.max(step, (y - h) * 0.5);
    }
    return null;
  }

  // Ground point under the screen point using a flat plane at height h.
  planeAt(sx, sy, h) {
    const ndc = new THREE.Vector2((sx / this.width) * 2 - 1, -(sy / this.height) * 2 + 1);
    this.raycaster.setFromCamera(ndc, this.camera);
    const o = this.raycaster.ray.origin;
    const d = this.raycaster.ray.direction;
    if (Math.abs(d.y) < 1e-4) return null;
    const t = (h - o.y) / d.y;
    if (t < 0) return null;
    return { x: o.x + d.x * t, z: o.z + d.z * t };
  }

  project(x, y, z, out) {
    const v = this.tmpV.set(x, y, z).project(this.camera);
    out.x = (v.x * 0.5 + 0.5) * this.width;
    out.y = (-v.y * 0.5 + 0.5) * this.height;
    out.behind = v.z > 1;
    return out;
  }

  flyTo(x, z, dist) {
    this.want.x = x;
    this.want.z = z;
    if (dist) this.want.dist = dist;
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
