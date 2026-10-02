// Battalion Command: The Kazan Front — app bootstrap and main loop.

import { GameMap } from './world/mapgen.js';
import { Game } from './sim/game.js';
import { SceneRig } from './render/scene.js';
import { Terrain } from './render/terrain.js';
import { Props } from './render/props.js';
import { Formations } from './render/units3d.js';
import { Effects } from './render/effects.js';
import { FrontLine } from './render/front.js';
import { Hud } from './render/hud.js';
import { UI } from './ui/ui.js';
import { Minimap } from './ui/minimap.js';
import { Sound } from './ui/audio.js';
import { STONE } from './data/config.js';
import { clamp, lerp } from './core/util.js';

const $ = (id) => document.getElementById(id);
const nextFrame = () => new Promise((r) => requestAnimationFrame(() => setTimeout(r, 0)));
const MAP_SEED = 7;

class App {
  constructor() {
    this.started = false;
    this.last = performance.now();
    this.weatherMix = { fog: 0, rain: 0 };
    this.dustAcc = 0;
    this.bridgeCheck = 0;
    this.perf = { acc: 0, frames: 0, level: 0 };
  }

  // Step quality down on slow machines: pixel ratio first, then shadows.
  adaptQuality(dt) {
    const p = this.perf;
    p.acc += dt;
    p.frames++;
    if (p.acc < 2.5) return;
    const avg = p.acc / p.frames;
    p.acc = 0;
    p.frames = 0;
    if (avg < 1 / 38 || p.level >= 3) return;
    p.level++;
    const r = this.rig.renderer;
    if (p.level === 1 && r.getPixelRatio() > 1) {
      r.setPixelRatio(1);
      this.rig.resize();
    } else if (p.level <= 2 && this.rig.useBloom) {
      this.rig.useBloom = false;
    } else if (p.level <= 2) {
      this.rig.sun.shadow.mapSize.set(1024, 1024);
      this.rig.sun.shadow.map?.dispose();
      this.rig.sun.shadow.map = null;
    } else {
      this.rig.sun.castShadow = false;
    }
  }

  async boot() {
    const step = async (text, pct) => {
      $('loadText').textContent = text;
      $('loadBar').style.width = pct + '%';
      await nextFrame();
    };
    try {
      await step('Surveying the battlefield…', 6);
      this.map = new GameMap(MAP_SEED).generate();
      await step('Raising mountains and carving rivers…', 30);
      this.rig = new SceneRig($('gl'), this.map);
      const small = Math.min(window.innerWidth, window.innerHeight) < 700 || /Mobi|Android/i.test(navigator.userAgent);
      const maxTex = this.rig.renderer.capabilities.maxTextureSize;
      this.terrain = new Terrain(this.rig, this.map, { texSize: small || maxTex < 4096 ? 2048 : 3072 });
      await step('Planting forests and building towns…', 62);
      this.props = new Props(this.rig, this.map, { quality: small ? 0.6 : 1 });
      await step('Mustering battalions…', 84);
      this.formations = new Formations(this.rig, this.map);
      this.effects = new Effects(this.rig, this.map);
      this.front = new FrontLine(this.rig, this.map);
      this.hud = new Hud($('hud'), this.rig, this.map);
      this.audio = new Sound();
      this.game = new Game(this.map, 'normal');
      this.game.paused = true;
      this.ui = new UI(this);
      this.minimap = new Minimap($('minimap'), this);
      await step('Ready.', 100);
    } catch (err) {
      console.error(err);
      $('loadText').textContent =
        'Could not start: ' + (err && err.message ? err.message : err) + ' — this game needs WebGL.';
      return;
    }
    window.addEventListener('resize', () => {
      this.rig.resize();
      this.hud.resize();
      this.minimap.resize();
    });
    this.setupTitle();
    $('loading').classList.add('hidden');
    $('title').classList.remove('hidden');
    this.rig.cam = { x: 1650, z: 980, dist: 1500, yaw: -0.5 };
    this.rig.want = { ...this.rig.cam };
    requestAnimationFrame((t) => this.frame(t));
  }

  setupTitle() {
    let diff = 'easy';
    document.querySelectorAll('#difficulty button').forEach((b) =>
      b.addEventListener('click', () => {
        diff = b.dataset.diff;
        document.querySelectorAll('#difficulty button').forEach((o) => o.classList.toggle('active', o === b));
      }),
    );
    $('startBtn').addEventListener('click', () => this.start(diff));
  }

  start(difficulty) {
    this.audio.init();
    this.audio.resume();
    this.game = new Game(this.map, difficulty);
    this.wire(this.game);
    this.ui.selected = [];
    this.ui.feed = [];
    this.started = true;
    $('title').classList.add('hidden');
    $('ui').classList.remove('hidden');
    this.minimap.resize();
    this.rig.want = { x: 1450, z: 1000, dist: 1350, yaw: 0 };
    this.ui.renderFeed();
    this.ui.renderTop();
    this.ui.addFeed({
      kind: 'info',
      icon: '⚑',
      text: 'The war begins. Hold the line and break through the Stone front.',
    });
    this.ui.addFeed({
      kind: 'info',
      icon: '◎',
      text: 'Objectives: Fort Kazan, the Eastern Bridge, Vorsk and Kharzad.',
    });
    this.ui.banner({
      text: 'THE WAR BEGINS',
      sub: 'Push the Stone Dominion back. Capture the ◎ objectives.',
      kind: 'info',
      big: true,
    });
    window.__app = this;
  }

  wire(game) {
    const now = () => performance.now() / 1000;
    game.on('feed', (f) => this.ui.addFeed(f));
    game.on('banner', (b) => this.ui.banner(b));
    game.on('float', (f) => this.hud.float(f.x, f.y, f.text, f.side));
    game.on('captured', ({ cell, side }) => this.terrain.flash(cell, side, now()));
    game.on('locationCaptured', ({ loc, side }) => {
      this.props.updateFlags();
      this.props.updateBeacons();
      if (loc.type !== 'village') {
        this.effects.ring(loc.x, loc.y, side, 220);
        setTimeout(() => this.effects.ring(loc.x, loc.y, side, 150), 250);
      } else {
        this.effects.ring(loc.x, loc.y, side, 90);
      }
    });
    game.on('shell', ({ x, y }) => this.effects.shell(x, y));
    game.on('explosion', ({ x, y, big }) => this.effects.explosion(x, y, big));
    game.on('bridge', ({ bridge, destroyed }) => this.props.setBridgeDestroyed(bridge.id, destroyed));
    game.on('unitDestroyed', (u) => {
      this.effects.explosion(u.x, u.y, true);
      this.effects.explosion(u.x + 15, u.y - 10, false);
    });
    game.on('gameOver', (o) => setTimeout(() => this.ui.showEnd(o), 1200));
    this.effects.onBoom = (x, z, big) => {
      const d = Math.hypot(x - this.rig.cam.x, z - this.rig.cam.z);
      const vol = clamp(1 - d / (this.rig.cam.dist * 1.4), 0, 1) * clamp(900 / this.rig.cam.dist, 0.25, 1);
      this.audio.explosion(vol * (big ? 1 : 0.7));
    };
  }

  // Muzzle flashes, tracers and shell bursts around every active battle.
  battleFx(dt) {
    const game = this.game;
    if (game.paused || game.over) return;
    const rig = this.rig;
    const fx = this.effects;
    const speedK = Math.sqrt(game.speed);
    const view = rig.cam.dist;
    const lod = view > 1900 ? 0.3 : view > 1200 ? 0.6 : 1;
    let audible = 0;
    const st = (u) => this.formations.state.get(u.id);
    for (const b of game.combat.battles) {
      if (b.over) continue;
      const A = b.attackers.map(st).filter((s) => s && s.front.length);
      const D = b.defenders.map(st).filter((s) => s && s.front.length);
      if (!A.length || !D.length) continue;
      const d = Math.hypot(b.x - rig.cam.x, b.y - rig.cam.z);
      audible = Math.max(audible, clamp(1 - d / (view * 1.3), 0, 1) * clamp(1000 / view, 0.2, 1));
      const f = (b.fx ||= { m: 0, t: 0, e: 0, s: 0 });
      const intensity = 0.6 + Math.min(1.4, (b.attackers.length + b.defenders.length) * 0.25);
      f.m += dt * 26 * lod * speedK * intensity;
      f.t += dt * 12 * lod * speedK * intensity;
      const heavy = [...b.attackers, ...b.defenders].filter((u) => u.type === 'heavy').length;
      f.e += dt * (0.45 + heavy * 0.8) * speedK;
      f.s += dt * 2.2 * lod;
      const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
      while (f.m > 1) {
        f.m -= 1;
        const p = pick(pick(Math.random() < 0.5 ? A : D).front);
        fx.muzzle(p[0] + (Math.random() - 0.5) * 3, p[1], p[2] + (Math.random() - 0.5) * 3);
      }
      while (f.t > 1) {
        f.t -= 1;
        const fromA = Math.random() < 0.5;
        const src = pick(pick(fromA ? A : D).front);
        const dst = pick(fromA ? D : A).center;
        const to = [
          dst[0] + (Math.random() - 0.5) * 34,
          dst[1] + 3 + Math.random() * 4,
          dst[2] + (Math.random() - 0.5) * 34,
        ];
        fx.tracer(src, to, fromA ? [1, 0.82, 0.4] : [1, 0.62, 0.32], 0.12 + Math.random() * 0.1);
      }
      while (f.e > 1) {
        f.e -= 1;
        const onDef = Math.random() < b.adv;
        const c = pick(onDef ? D : A).center;
        const x = c[0] + (Math.random() - 0.5) * 60;
        const z = c[2] + (Math.random() - 0.5) * 60;
        fx.explosion(x, z, Math.random() < 0.25);
      }
      while (f.s > 1) {
        f.s -= 1;
        const c = pick(Math.random() < 0.5 ? A : D).center;
        fx.dust(c[0] + (Math.random() - 0.5) * 40, c[2] + (Math.random() - 0.5) * 40);
      }
    }
    this.audio.battle(audible, dt);
  }

  marchDust(dt) {
    const game = this.game;
    if (game.paused) return;
    this.dustAcc += dt;
    if (this.dustAcc < 0.22) return;
    this.dustAcc = 0;
    const rig = this.rig;
    if (rig.cam.dist > 1400) return;
    for (const u of game.units) {
      if (!u.alive || !u.moving || !u.speedNow || !game.isVisible(u)) continue;
      if (Math.hypot(u.x - rig.cam.x, u.y - rig.cam.z) > rig.cam.dist * 1.2) continue;
      this.effects.dust(u.x - Math.cos(u.heading) * 18, u.y - Math.sin(u.heading) * 18);
    }
  }

  weatherVisuals(dt) {
    const w = this.game.weather.type;
    const k = 1 - Math.exp(-dt * 0.8);
    this.weatherMix.fog = lerp(this.weatherMix.fog, w === 'fog' ? 1 : 0, k);
    this.weatherMix.rain = lerp(this.weatherMix.rain, w === 'rain' ? 1 : 0, k);
    const rig = this.rig;
    const fog = this.weatherMix.fog;
    const rain = this.weatherMix.rain;
    rig.scene.fog.near *= 1 - fog * 0.75;
    rig.scene.fog.far *= 1 - fog * 0.62 - rain * 0.25;
    rig.scene.fog.color.setRGB(
      lerp(0.79, 0.74, rain) + fog * 0.04,
      lerp(0.84, 0.77, rain) + fog * 0.02,
      lerp(0.86, 0.8, rain),
    );
    rig.scene.background.copy(rig.scene.fog.color);
    rig.sun.intensity = 2.6 * (1 - rain * 0.45 - fog * 0.3);
    rig.hemi.intensity = 1.25 * (1 - rain * 0.2);
  }

  frame(t) {
    const now = t / 1000;
    const dt = Math.min(0.05, (t - this.last) / 1000);
    this.last = t;
    if (!window.__noAdapt) this.adaptQuality(dt);
    const game = this.game;
    if (this.started) {
      game.update(dt);
      this.ui.update(dt);
    } else {
      this.rig.want.yaw += dt * 0.035;
    }
    this.rig.updateCamera(dt);
    this.weatherVisuals(dt);
    this.terrain.update(now, game.territory.version);
    this.front.update(now, game.territory, this.rig.cam.dist);
    this.props.update(now, this.rig.cam.dist);
    this.formations.update(
      now,
      dt,
      game,
      this.started ? this.ui.selected : [],
      this.ui.hover && this.ui.hover.side === STONE && this.ui.commandable().length ? this.ui.hover : null,
    );
    if (this.started) {
      this.battleFx(dt);
      this.marchDust(dt);
      this.bridgeCheck += dt;
      if (this.bridgeCheck > 1) {
        this.bridgeCheck = 0;
        for (const br of this.map.bridges) this.props.setBridgeDestroyed(br.id, br.destroyedUntil > game.time);
      }
    }
    this.effects.update(dt, now, game.weather.type);
    this.rig.render();
    if (this.started) {
      this.hud.draw(now, game, this.ui);
      this.minimap.draw(now, game);
    } else {
      this.hud.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.hud.ctx.clearRect(0, 0, this.hud.canvas.width, this.hud.canvas.height);
    }
    requestAnimationFrame((tt) => this.frame(tt));
  }
}

const app = new App();
window.__app = app;
app.boot();
