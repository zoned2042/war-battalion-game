// Strategic minimap: territory, front, battalions, battles and the camera view.

import { WORLD, SIDES, LEAF, STONE, OBJECTIVES } from '../data/config.js';

const { W, H, MARGIN: M } = WORLD;

export class Minimap {
  constructor(canvas, app) {
    this.canvas = canvas;
    this.app = app;
    this.ctx = canvas.getContext('2d');
    this.version = -1;
    this.last = 0;
    this.layer = document.createElement('canvas');
    this.resize();
    const goto = (e) => {
      const r = canvas.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * W;
      const y = ((e.clientY - r.top) / r.height) * H;
      app.rig.flyTo(x, y);
    };
    let down = false;
    canvas.addEventListener('pointerdown', (e) => {
      down = true;
      canvas.setPointerCapture(e.pointerId);
      goto(e);
    });
    canvas.addEventListener('pointermove', (e) => down && goto(e));
    canvas.addEventListener('pointerup', () => (down = false));
  }

  resize() {
    const r = this.canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = Math.max(100, Math.round(r.width || 256));
    this.h = Math.max(60, Math.round(r.height || 160));
    this.canvas.width = this.w * dpr;
    this.canvas.height = this.h * dpr;
    this.dpr = dpr;
    this.layer.width = this.canvas.width;
    this.layer.height = this.canvas.height;
    this.version = -1;
  }

  // Terrain background from the painted ground texture, ownership on top.
  rebuild(game) {
    const ctx = this.layer.getContext('2d');
    const cw = this.layer.width;
    const ch = this.layer.height;
    const base = this.app.terrain.baseCanvas;
    const sx = (M / (W + 2 * M)) * base.width;
    const sy = (M / (H + 2 * M)) * base.height;
    const sw = (W / (W + 2 * M)) * base.width;
    const sh = (H / (H + 2 * M)) * base.height;
    ctx.drawImage(base, sx, sy, sw, sh, 0, 0, cw, ch);
    const kx = cw / W;
    const ky = ch / H;
    ctx.setTransform(kx, 0, 0, ky, 0, 0);
    for (const side of [LEAF, STONE]) {
      const t = SIDES[side].tint;
      ctx.fillStyle = `rgba(${t[0]},${t[1]},${t[2]},0.42)`;
      ctx.beginPath();
      for (const c of game.map.cells) {
        if (c.owner !== side) continue;
        c.poly.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
        ctx.closePath();
      }
      ctx.fill();
    }
    ctx.strokeStyle = '#ffe9a0';
    ctx.lineWidth = 2.4 / kx;
    ctx.lineJoin = 'round';
    for (const l of game.territory.frontLines()) {
      ctx.beginPath();
      l.pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
      ctx.stroke();
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  draw(now, game) {
    if (now - this.last < 0.1) return;
    this.last = now;
    if (game.territory.version !== this.version) {
      this.version = game.territory.version;
      this.rebuild(game);
    }
    const ctx = this.ctx;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(this.layer, 0, 0);
    const kx = this.canvas.width / W;
    const ky = this.canvas.height / H;
    const d = this.dpr;
    // objectives
    for (const k of [...OBJECTIVES[LEAF], ...OBJECTIVES[STONE]]) {
      const l = game.map.locByKey[k];
      ctx.beginPath();
      ctx.arc(l.x * kx, l.y * ky, 4.5 * d, 0, Math.PI * 2);
      ctx.strokeStyle = l.owner === LEAF ? '#7dffa0' : '#ffb3a6';
      ctx.lineWidth = 1.6 * d;
      ctx.stroke();
    }
    // units
    for (const u of game.units) {
      if (!u.alive || !game.isVisible(u)) continue;
      ctx.fillStyle = u.side === LEAF ? '#3dff7a' : '#ff4a3a';
      const s = (u.side === LEAF && this.app.ui.selected.includes(u) ? 4.5 : 3) * d;
      ctx.fillRect(u.x * kx - s / 2, u.y * ky - s / 2, s, s);
      if (this.app.ui.selected.includes(u)) {
        ctx.strokeStyle = '#ffe066';
        ctx.lineWidth = 1.2 * d;
        ctx.strokeRect(u.x * kx - s, u.y * ky - s, s * 2, s * 2);
      }
    }
    // battles
    for (const b of game.combat.battles) {
      if (b.over) continue;
      const r = (3 + Math.sin(now * 8 + b.id) * 1.2) * d;
      ctx.beginPath();
      ctx.arc(b.x * kx, b.y * ky, r + 2 * d, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,140,40,0.85)';
      ctx.fill();
    }
    // camera footprint
    const rig = this.app.rig;
    const corners = [
      [0, 0],
      [rig.width, 0],
      [rig.width, rig.height],
      [0, rig.height],
    ].map(([x, y]) => rig.planeAt(x, Math.max(y, rig.height * 0.02), rig.targetH));
    if (corners.every(Boolean)) {
      ctx.beginPath();
      corners.forEach((p, i) => (i ? ctx.lineTo(p.x * kx, p.z * ky) : ctx.moveTo(p.x * kx, p.z * ky)));
      ctx.closePath();
      ctx.strokeStyle = 'rgba(255,255,255,0.85)';
      ctx.lineWidth = 1.2 * d;
      ctx.stroke();
    }
  }
}
