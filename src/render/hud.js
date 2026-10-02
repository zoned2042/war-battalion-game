// 2D overlay on top of the 3D view: unit counters, order arrows, battle
// markers, place names and floating combat text.

import { SIDES, LEAF, STONE, OBJECTIVES } from '../data/config.js';
import { clamp } from '../core/util.js';

const ORDER_COLORS = {
  move: '#ffffff',
  attack: '#ff6a48',
  reinforce: '#5cd4ff',
  retreat: '#ffd34d',
  defend: '#9fe08a',
};

export class Hud {
  constructor(canvas, rig, map) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.rig = rig;
    this.map = map;
    this.floats = [];
    this.tmp = { x: 0, y: 0, behind: false };
    this.objectiveKeys = new Set([...OBJECTIVES[LEAF], ...OBJECTIVES[STONE]]);
    this.counterRects = []; // for picking: { u, x, y, w, h }
    this.battleRects = [];
    this.resize();
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.dpr = dpr;
    this.canvas.width = Math.round(window.innerWidth * dpr);
    this.canvas.height = Math.round(window.innerHeight * dpr);
    this.canvas.style.width = window.innerWidth + 'px';
    this.canvas.style.height = window.innerHeight + 'px';
  }

  proj(x, y, z) {
    const r = this.rig.project(x, y, z, { x: 0, y: 0, behind: false });
    return r;
  }

  float(x, y, text, side) {
    // skip duplicates at the same spot
    const t = performance.now() / 1000;
    if (this.floats.some((f) => f.text === text && Math.hypot(f.x - x, f.y - y) < 60 && t - f.t < 1)) return;
    this.floats.push({ x, y, text, side, t });
    if (this.floats.length > 14) this.floats.shift();
  }

  draw(now, game, ui) {
    const ctx = this.ctx;
    const W = window.innerWidth;
    const H = window.innerHeight;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    const dist = this.rig.cam.dist;
    const k = clamp(1100 / dist, 0.72, 1.25);
    this.k = k;
    this.drawLocations(ctx, game, dist, k);
    this.drawPaths(ctx, now, game, ui);
    this.drawUnits(ctx, now, game, ui, dist, k);
    this.drawBattles(ctx, now, game, ui, dist, k);
    this.drawSieges(ctx, game, k);
    this.drawFloats(ctx, now);
    this.drawSelectBox(ctx, ui);
    this.drawCursor(ctx, now, ui, game);
  }

  // ---------------------------------------------------------------- places
  drawLocations(ctx, game, dist, k) {
    const map = this.map;
    for (const l of map.locations) {
      const isObj = this.objectiveKeys.has(l.key);
      if (l.type === 'village' && dist > 1250) continue;
      if (l.type === 'bridge' && !isObj && dist > 900) continue;
      const lift = l.type === 'capital' ? 70 : l.type === 'city' ? 48 : l.type === 'fort' ? 50 : 22;
      const p = this.proj(l.x, map.heightAt(l.x, l.y) + lift, l.y);
      if (p.behind || p.x < -100 || p.y < -50 || p.x > window.innerWidth + 100 || p.y > window.innerHeight + 50)
        continue;
      const owner = l.owner;
      const col = owner === LEAF ? '#bff5c9' : owner === STONE ? '#ffc9bd' : '#eeeeee';
      const size = (l.type === 'capital' ? 17 : l.type === 'village' ? 11 : 14) * k;
      ctx.font = `${l.type === 'village' ? 500 : 700} ${size}px Rajdhani, "Segoe UI", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      let label = l.name;
      if (l.type === 'capital') label = '★ ' + label.toUpperCase() + ' ★';
      else if (l.type !== 'village') label = label.toUpperCase();
      const tw = ctx.measureText(label).width;
      if (isObj) {
        // objective tag
        const wanted = OBJECTIVES[LEAF].includes(l.key);
        const held = owner === LEAF;
        ctx.fillStyle = held ? 'rgba(30,110,60,0.85)' : 'rgba(120,30,24,0.85)';
        const tag = wanted ? (held ? '✓ OBJECTIVE TAKEN' : '◎ OBJECTIVE') : held ? '⚑ DEFEND' : '⚠ LOST — RETAKE';
        ctx.font = `700 ${9.5 * k}px Rajdhani, "Segoe UI", sans-serif`;
        const tagW = ctx.measureText(tag).width + 10;
        ctx.beginPath();
        ctx.roundRect(p.x - tagW / 2, p.y - size - 12 * k, tagW, 13 * k, 3);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.fillText(tag, p.x, p.y - size - 5.5 * k);
        ctx.font = `700 ${size}px Rajdhani, "Segoe UI", sans-serif`;
      }
      ctx.font = `${l.type === 'village' ? 500 : 700} ${size}px Rajdhani, "Segoe UI", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = 'rgba(10,12,10,0.85)';
      ctx.lineJoin = 'round';
      ctx.strokeText(label, p.x, p.y);
      ctx.fillStyle = col;
      ctx.fillText(label, p.x, p.y);
      if (l.type === 'fort' || l.type === 'city' || l.type === 'capital') {
        ctx.fillStyle = owner === LEAF ? SIDES[LEAF].color : SIDES[STONE].color;
        ctx.fillRect(p.x - tw / 2, p.y + size * 0.55, tw, 2);
      }
    }
  }

  drawSieges(ctx, game, k) {
    for (const s of game.sieges.values()) {
      const l = s.loc;
      const lift = l.type === 'capital' ? 70 : l.type === 'city' ? 48 : l.type === 'fort' ? 50 : 22;
      const p = this.proj(l.x, this.map.heightAt(l.x, l.y) + lift, l.y);
      if (p.behind) continue;
      ctx.font = `700 ${14 * k}px Rajdhani, "Segoe UI", sans-serif`;
      const tw = ctx.measureText(l.name.toUpperCase()).width;
      this.siegeRing(ctx, p.x + tw / 2 + 24 * k, p.y, s, k);
    }
  }

  siegeRing(ctx, x, y, s, k) {
    const frac = clamp(s.progress / s.need, 0, 1);
    const mine = s.side === LEAF;
    const r = 13 * k;
    const now = performance.now() / 1000;
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r + 4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(10,10,8,0.85)';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y, r, -Math.PI / 2, -Math.PI / 2 + frac * Math.PI * 2);
    ctx.strokeStyle = mine ? '#6ee07a' : '#ff5a4a';
    ctx.lineWidth = 4 * k;
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.font = `700 ${Math.round(10 * k)}px Rajdhani, "Segoe UI", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(Math.round(frac * 100) + '%', x, y + 0.5);
    const tag = mine ? 'CAPTURING' : 'UNDER SIEGE';
    ctx.font = `700 ${Math.round(11 * k)}px Rajdhani, "Segoe UI", sans-serif`;
    ctx.globalAlpha = mine ? 1 : 0.65 + 0.35 * Math.sin(now * 6);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(0,0,0,0.9)';
    ctx.strokeText(tag, x, y + r + 11 * k);
    ctx.fillStyle = mine ? '#9dffb2' : '#ff8a7a';
    ctx.fillText(tag, x, y + r + 11 * k);
    ctx.restore();
  }

  // ---------------------------------------------------------------- paths
  pathPoints(u) {
    const map = this.map;
    const pts = [[u.x, u.y]];
    let cur = u.cell;
    for (const id of u.path) {
      const e = map.edge(cur, id);
      if (e) pts.push([e.mx, e.my]);
      const c = map.cells[id];
      pts.push([c.x, c.y]);
      cur = id;
    }
    return pts;
  }

  strokePath(ctx, pts3, color, width, alpha, dash, now, arrow) {
    const sp = [];
    for (const [x, y] of pts3) {
      const p = this.proj(x, Math.max(-2, this.map.heightAt(x, y)) + 4, y);
      if (p.behind) return;
      sp.push(p);
    }
    if (sp.length < 2) return;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    sp.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
    ctx.strokeStyle = 'rgba(0,0,0,0.55)';
    ctx.lineWidth = width + 3;
    ctx.stroke();
    if (dash) {
      ctx.setLineDash([10, 8]);
      ctx.lineDashOffset = -now * 40;
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.setLineDash([]);
    if (arrow) {
      const a = sp[sp.length - 2];
      const b = sp[sp.length - 1];
      const ang = Math.atan2(b.y - a.y, b.x - a.x);
      const s = 7 + width * 2;
      ctx.beginPath();
      ctx.moveTo(b.x + Math.cos(ang) * s * 0.6, b.y + Math.sin(ang) * s * 0.6);
      ctx.lineTo(b.x + Math.cos(ang + 2.5) * s, b.y + Math.sin(ang + 2.5) * s);
      ctx.lineTo(b.x + Math.cos(ang - 2.5) * s, b.y + Math.sin(ang - 2.5) * s);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.strokeStyle = 'rgba(0,0,0,0.6)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fill();
    }
    ctx.restore();
  }

  drawPaths(ctx, now, game, ui) {
    for (const u of game.units) {
      if (!u.alive || !u.path.length) continue;
      const selected = ui.selected.includes(u);
      if (u.side === LEAF) {
        const col = ORDER_COLORS[u.order.type] || '#ffffff';
        this.strokePath(ctx, this.pathPoints(u), col, selected ? 3.2 : 2, selected ? 0.95 : 0.4, true, now, true);
      } else if (game.isVisible(u) && (u.order.type === 'attack' || u.task?.kind === 'offensive')) {
        const pts = this.pathPoints(u).slice(0, 7);
        this.strokePath(ctx, pts, '#ff4a3a', 2.4, 0.75, false, now, true);
      }
    }
    // planned route preview under the cursor
    if (ui.preview && ui.preview.pts) {
      this.strokePath(ctx, ui.preview.pts, ui.preview.color, 2.5, 0.6, true, now, true);
    }
  }

  // ---------------------------------------------------------------- units
  symbol(ctx, type, x, y, w, h) {
    ctx.strokeStyle = '#fff';
    ctx.fillStyle = '#fff';
    ctx.lineWidth = 1.6;
    const l = x - w / 2 + 3;
    const r = x + w / 2 - 3;
    const t = y - h / 2 + 3;
    const b = y + h / 2 - 3;
    ctx.beginPath();
    if (type === 'infantry' || type === 'assault') {
      ctx.moveTo(l, t);
      ctx.lineTo(r, b);
      ctx.moveTo(r, t);
      ctx.lineTo(l, b);
      ctx.stroke();
      if (type === 'assault') {
        ctx.beginPath();
        ctx.moveTo(x - 4, t - 1);
        ctx.lineTo(x, t + 3);
        ctx.lineTo(x + 4, t - 1);
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    } else if (type === 'scout') {
      ctx.moveTo(l, b);
      ctx.lineTo(r, t);
      ctx.stroke();
    } else if (type === 'medical') {
      ctx.fillRect(x - 1.8, t + 1, 3.6, b - t - 2);
      ctx.fillRect(x - (b - t) / 2 + 1, y - 1.8, b - t - 2, 3.6);
    } else if (type === 'heavy') {
      ctx.arc(x, y, Math.min(w, h) * 0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(l, b);
      ctx.lineTo(r, b);
      ctx.stroke();
    }
  }

  drawUnits(ctx, now, game, ui, dist, k) {
    this.counterRects = [];
    const map = this.map;
    const list = game.units.filter((u) => u.alive && game.isVisible(u));
    // draw far ones first
    const cam = this.rig.camera.position;
    list.sort((a, b) => Math.hypot(b.x - cam.x, b.y - cam.z) - Math.hypot(a.x - cam.x, a.y - cam.z));
    for (const u of list) {
      const gh = map.heightAt(u.x, u.y);
      const foot = this.proj(u.x, gh + 2, u.y);
      if (foot.behind) continue;
      const W = window.innerWidth;
      const H = window.innerHeight;
      if (foot.x < -60 || foot.y < -60 || foot.x > W + 60 || foot.y > H + 90) continue;
      const head = this.proj(u.x, gh + 30, u.y);
      const top = { x: foot.x, y: Math.min(head.y, foot.y - 30 * k) - 16 * k };
      const selected = ui.selected.includes(u);
      const hovered = ui.hover === u;
      const w = 34 * k;
      const h = 22 * k;
      const x = top.x;
      const y = top.y - h / 2;
      // stem to the ground
      ctx.strokeStyle = 'rgba(0,0,0,0.45)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(x, y + h / 2);
      ctx.lineTo(foot.x, foot.y);
      ctx.stroke();
      const alpha = u.routed ? 0.75 : 1;
      ctx.globalAlpha = alpha;
      // body
      const grad = ctx.createLinearGradient(0, y - h / 2, 0, y + h / 2);
      grad.addColorStop(0, u.side === LEAF ? '#3fa660' : '#cc4434');
      grad.addColorStop(1, u.side === LEAF ? '#24703c' : '#8e2a20');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(x - w / 2, y - h / 2, w, h, 3);
      ctx.fill();
      ctx.lineWidth = selected ? 2.6 : 1.4;
      ctx.strokeStyle = selected
        ? `rgba(255,224,102,${0.75 + Math.sin(now * 6) * 0.25})`
        : hovered
          ? '#ffffff'
          : 'rgba(255,255,255,0.75)';
      ctx.stroke();
      this.symbol(ctx, u.type, x, y, w, h);
      // battalion size marker "II"
      ctx.fillStyle = '#fff';
      ctx.font = `700 ${8 * k}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText('I I', x, y - h / 2 - 1);
      // bars
      const bw = w;
      const by = y + h / 2 + 3;
      const sf = u.soldiers / u.max;
      ctx.fillStyle = 'rgba(0,0,0,0.65)';
      ctx.fillRect(x - bw / 2 - 1, by - 1, bw + 2, 9 * k);
      ctx.fillStyle = sf > 0.6 ? '#6ee07a' : sf > 0.33 ? '#ffd24a' : '#ff5a4a';
      ctx.fillRect(x - bw / 2, by, bw * sf, 3.6 * k);
      ctx.fillStyle = '#7ec8ff';
      ctx.fillRect(x - bw / 2, by + 4.4 * k, bw * u.morale, 2.6 * k);
      ctx.globalAlpha = 1;
      // badges
      const bx = x + w / 2;
      const byy = y - h / 2;
      if (u.battle) this.badgeSwords(ctx, bx, byy, 7.5 * k, now);
      else if (u.routed) this.badge(ctx, bx, byy, 7 * k, '#eeeeee', '⚐', '#333');
      else if (u.surrounded) this.badge(ctx, bx, byy, 7 * k, '#ff4040', '!', '#fff');
      if (!u.battle && u.entrench > 0.3 && !u.moving) this.shield(ctx, x - w / 2, byy, 7 * k, u.entrench);
      // label
      if (dist < 1150 || selected || hovered) {
        ctx.font = `700 ${11 * k}px Rajdhani, "Segoe UI", sans-serif`;
        ctx.textBaseline = 'top';
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(0,0,0,0.85)';
        const ly = by + 9 * k;
        ctx.strokeText(u.short, x, ly);
        ctx.fillStyle = u.side === LEAF ? '#d9ffe1' : '#ffd9d2';
        ctx.fillText(u.short, x, ly);
      }
      this.counterRects.push({ u, x: x - w / 2 - 4, y: y - h / 2 - 8, w: w + 8, h: h + 22, fx: foot.x, fy: foot.y });
    }
  }

  badge(ctx, x, y, r, bg, text, fg) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = bg;
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.6)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = fg;
    ctx.font = `700 ${r * 1.5}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y + 0.5);
  }

  badgeSwords(ctx, x, y, r, now) {
    ctx.beginPath();
    ctx.arc(x, y, r * (1 + Math.sin(now * 8) * 0.08), 0, Math.PI * 2);
    ctx.fillStyle = '#ff8a2a';
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.6)';
    ctx.lineWidth = 1;
    ctx.stroke();
    this.swords(ctx, x, y, r * 0.8, '#fff', 1.4);
  }

  swords(ctx, x, y, r, color, lw) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = lw;
    ctx.lineCap = 'round';
    for (const s of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(x - r * s, y + r);
      ctx.lineTo(x + r * s, y - r);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x - r * s * 0.95 + r * 0.35, y + r * 0.6 + r * 0.35 * s * s);
      ctx.lineTo(x - r * s * 0.95 - r * 0.35 * 0.2, y + r * 0.35);
      ctx.stroke();
    }
    ctx.restore();
  }

  shield(ctx, x, y, r, e) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, y - r);
    ctx.lineTo(x + r * 0.85, y - r * 0.6);
    ctx.lineTo(x + r * 0.7, y + r * 0.4);
    ctx.lineTo(x, y + r);
    ctx.lineTo(x - r * 0.7, y + r * 0.4);
    ctx.lineTo(x - r * 0.85, y - r * 0.6);
    ctx.closePath();
    ctx.fillStyle = e > 0.6 ? '#9fe08a' : '#d8e8b0';
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.65)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
  }

  // ---------------------------------------------------------------- battles
  battleAnchor(b) {
    const map = this.map;
    const a = b.attackers[0];
    const c = map.cells[b.cell];
    const x = a ? (a.x + c.x) / 2 : c.x;
    const y = a ? (a.y + c.y) / 2 : c.y;
    return [x, y];
  }

  drawBattles(ctx, now, game, ui, dist, k) {
    this.battleRects = [];
    for (const b of game.combat.battles) {
      const [bx, by] = this.battleAnchor(b);
      const gh = this.map.heightAt(bx, by);
      const p = this.proj(bx, gh + 58, by);
      if (p.behind) continue;
      if (b.over) {
        // brief result marker
        const age = game.time - b.endTime;
        const a = clamp(1 - age / 4, 0, 1);
        ctx.globalAlpha = a;
        this.badge(ctx, p.x, p.y, 12 * k, SIDES[b.winner].color, b.winner === LEAF ? '✓' : '✗', '#fff');
        ctx.globalAlpha = 1;
        continue;
      }
      const focus = ui.focusBattle === b;
      const r = (focus ? 17 : 14) * k;
      const pulse = 1 + Math.sin(now * 6 + b.id) * 0.1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r * 1.55 * pulse, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,120,40,0.18)';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(28,20,14,0.92)';
      ctx.fill();
      ctx.lineWidth = 2.2;
      ctx.strokeStyle = focus ? '#ffe066' : '#ff9a3c';
      ctx.stroke();
      this.swords(ctx, p.x, p.y, r * 0.52, '#ffd9a0', 2.2);
      // balance bar: Leaf share on the left
      const leafShare = b.attSide === LEAF ? b.adv : 1 - b.adv;
      const bw = 64 * k;
      const bh = 6 * k;
      const yy = p.y + r + 5;
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(p.x - bw / 2 - 1.5, yy - 1.5, bw + 3, bh + 3);
      ctx.fillStyle = SIDES[LEAF].color;
      ctx.fillRect(p.x - bw / 2, yy, bw * leafShare, bh);
      ctx.fillStyle = SIDES[STONE].color;
      ctx.fillRect(p.x - bw / 2 + bw * leafShare, yy, bw * (1 - leafShare), bh);
      ctx.fillStyle = '#fff';
      ctx.fillRect(p.x - bw / 2 + bw * leafShare - 1, yy - 2, 2, bh + 4);
      if (dist < 1500 || focus) {
        const s = game.combat.summary(b);
        const leafN = b.attSide === LEAF ? s.attSoldiers : s.defSoldiers;
        const stoneN = b.attSide === LEAF ? s.defSoldiers : s.attSoldiers;
        ctx.font = `700 ${11 * k}px Rajdhani, "Segoe UI", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        const txt = `${Math.round(leafN).toLocaleString()}  vs  ${Math.round(stoneN).toLocaleString()}`;
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(0,0,0,0.85)';
        ctx.strokeText(txt, p.x, yy + bh + 3);
        ctx.fillStyle = '#ffe9c8';
        ctx.fillText(txt, p.x, yy + bh + 3);
      }
      this.battleRects.push({ b, x: p.x - r, y: p.y - r, w: r * 2, h: r * 2 + 30 });
    }
  }

  drawFloats(ctx, now) {
    const t = performance.now() / 1000;
    this.floats = this.floats.filter((f) => t - f.t < 2.6);
    if (!this.floats.length) return;
    const size = Math.round(15 * this.k);
    ctx.font = `700 ${size}px Rajdhani, "Segoe UI", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'rgba(0,0,0,0.9)';
    const W = window.innerWidth;
    const H = window.innerHeight;
    for (const f of this.floats) {
      const age = t - f.t;
      const gh = this.map.heightAt(f.x, f.y);
      const p = this.proj(f.x, gh + 80, f.y);
      if (p.behind || p.x < -80 || p.x > W + 80 || p.y < -40 || p.y > H + 40) continue;
      ctx.globalAlpha = age < 0.2 ? age / 0.2 : clamp(1 - (age - 1.6) / 1, 0, 1);
      const y = p.y - age * 22 - (age < 0.2 ? (0.2 - age) * 30 : 0);
      ctx.strokeText(f.text, p.x, y);
      ctx.fillStyle = f.side === LEAF ? '#9dffb2' : f.side === STONE ? '#ffab9a' : '#fff';
      ctx.fillText(f.text, p.x, y);
    }
    ctx.globalAlpha = 1;
  }

  drawSelectBox(ctx, ui) {
    const b = ui.dragBox;
    if (!b) return;
    ctx.fillStyle = 'rgba(255,224,102,0.12)';
    ctx.strokeStyle = 'rgba(255,224,102,0.9)';
    ctx.lineWidth = 1.5;
    const x = Math.min(b.x0, b.x1);
    const y = Math.min(b.y0, b.y1);
    ctx.fillRect(x, y, Math.abs(b.x1 - b.x0), Math.abs(b.y1 - b.y0));
    ctx.strokeRect(x, y, Math.abs(b.x1 - b.x0), Math.abs(b.y1 - b.y0));
  }

  drawCursor(ctx, now, ui) {
    if (!ui.mouse || !ui.selected.length) return;
    const mode = ui.mode;
    if (mode === 'move' && !ui.hover) return;
    const { x, y } = ui.mouse;
    let label = '';
    let color = '#fff';
    if (ui.hover && ui.hover.side === STONE) {
      label = 'ATTACK';
      color = '#ff6a48';
    } else if (mode === 'attack') {
      label = 'ATTACK';
      color = '#ff6a48';
    } else if (mode === 'reinforce') {
      label = ui.hover && ui.hover.side === LEAF ? 'REINFORCE' : 'PICK A BATTALION';
      color = '#5cd4ff';
    } else return;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    const r = 12 + Math.sin(now * 8) * 1.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.moveTo(x - r - 5, y);
    ctx.lineTo(x - r + 4, y);
    ctx.moveTo(x + r - 4, y);
    ctx.lineTo(x + r + 5, y);
    ctx.moveTo(x, y - r - 5);
    ctx.lineTo(x, y - r + 4);
    ctx.moveTo(x, y + r - 4);
    ctx.lineTo(x, y + r + 5);
    ctx.stroke();
    ctx.font = '700 12px Rajdhani, "Segoe UI", sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(0,0,0,0.85)';
    ctx.strokeText(label, x + r + 8, y);
    ctx.fillStyle = color;
    ctx.fillText(label, x + r + 8, y);
    ctx.restore();
  }

  // Picking helpers in screen space.
  unitAt(sx, sy, filter) {
    let best = null;
    let bd = Infinity;
    for (const r of this.counterRects) {
      if (filter && !filter(r.u)) continue;
      const inBox = sx >= r.x && sx <= r.x + r.w && sy >= r.y && sy <= r.y + r.h;
      const dFoot = Math.hypot(sx - r.fx, sy - r.fy);
      const d = inBox ? 0 : dFoot < 22 ? dFoot : Infinity;
      // later entries are nearer the camera, so they win ties
      if (d <= bd && d !== Infinity) {
        bd = d;
        best = r.u;
      }
    }
    return best;
  }

  battleAt(sx, sy) {
    for (const r of this.battleRects) {
      if (sx >= r.x && sx <= r.x + r.w && sy >= r.y && sy <= r.y + r.h) return r.b;
    }
    return null;
  }
}
