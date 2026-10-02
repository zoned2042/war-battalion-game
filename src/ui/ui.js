// Player interface: selection, orders, panels, feed, banners and modals.

import { LEAF, STONE, SIDES, OBJECTIVES, TRAITS, UNIT_TYPES, TERRAIN, LOCATION_TYPES, xpLevel } from '../data/config.js';
import { unitStatus, etaHours, findPath } from '../sim/units.js';
import { formatNum, pct, clamp } from '../core/util.js';

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

const HINTS = {
  none: 'Click one of your <b style="color:#7dffa0">green battalions</b> to select it · Drag to pan · Scroll to zoom',
  move: 'Click the map to <b>MOVE</b> · Click a <b style="color:#ff8a6a">red battalion</b> to <b>ATTACK</b> · Shift-click to add battalions',
  attack: 'Click an <b style="color:#ff8a6a">enemy battalion</b> or enemy ground to <b>ATTACK</b> · Esc to cancel',
  reinforce: 'Click a <b style="color:#7dffa0">friendly battalion</b> or a battle to <b>REINFORCE</b> it · Esc to cancel',
  enemy: 'Enemy battalion — select your own battalions, then click this one to attack it',
  routed: 'This battalion is routed and regrouping — it will take orders once it recovers',
};

export class UI {
  constructor(app) {
    this.app = app;
    this.selected = [];
    this.mode = 'move';
    this.hover = null;
    this.focusBattle = null;
    this.battleIdx = 0;
    this.dragBox = null;
    this.mouse = null;
    this.feed = [];
    this.bannerQueue = [];
    this.bannerBusy = false;
    this.lastPanel = 0;
    this.lastTop = 0;
    this.lastClick = { t: 0, u: null };
    this.keys = new Set();
    this.pointers = new Map();
    this.bind();
  }

  get game() {
    return this.app.game;
  }

  get rig() {
    return this.app.rig;
  }

  // ---------------------------------------------------------------- selection
  commandable() {
    return this.selected.filter((u) => u.side === LEAF && u.alive && !u.routed);
  }

  select(list, additive = false) {
    list = list.filter((u) => u && u.alive);
    if (additive) {
      for (const u of list) {
        if (this.selected.includes(u)) this.selected = this.selected.filter((o) => o !== u);
        else if (u.side === LEAF && this.selected.every((o) => o.side === LEAF)) this.selected.push(u);
      }
    } else {
      this.selected = list;
    }
    if (!this.selected.length || this.selected.some((u) => u.side !== LEAF)) this.mode = 'move';
    this.app.audio.click();
    this.refreshPanels(true);
  }

  clearSelection() {
    this.selected = [];
    this.mode = 'move';
    this.refreshPanels(true);
  }

  setMode(mode) {
    if (!this.commandable().length) {
      this.flashHint('Select one of your battalions first');
      return;
    }
    this.mode = this.mode === mode ? 'move' : mode;
    this.app.audio.click();
    this.refreshPanels(true);
  }

  // ---------------------------------------------------------------- orders
  orderButton(type) {
    const units = this.commandable();
    if (!units.length) {
      this.flashHint(this.selected.length ? HINTS.routed : 'Select one of your battalions first');
      return;
    }
    const orders = this.game.orders;
    if (type === 'move' || type === 'attack' || type === 'reinforce') {
      this.setMode(type);
      return;
    }
    let ok = 0;
    for (const u of units) {
      if (type === 'defend' && orders.defend(u)) ok++;
      if (type === 'retreat' && orders.retreat(u)) ok++;
    }
    if (ok) {
      this.app.audio.order();
      this.flashHint(type === 'defend' ? `${ok} battalion${ok > 1 ? 's' : ''} digging in` : `${ok} battalion${ok > 1 ? 's' : ''} falling back to safety`);
    } else if (type === 'retreat') {
      this.flashHint('No safe line of retreat!');
    }
    this.mode = 'move';
    this.refreshPanels(true);
  }

  spreadCells(dest, n) {
    const map = this.game.map;
    const res = [dest];
    const seen = new Set([dest]);
    const queue = [dest];
    while (res.length < n && queue.length) {
      const c = queue.shift();
      for (const nb of map.cells[c].nbrs) {
        if (seen.has(nb)) continue;
        seen.add(nb);
        const cn = map.cells[nb];
        if (!cn.passable) continue;
        if (this.game.enemiesInCell(LEAF, nb).length) continue;
        res.push(nb);
        queue.push(nb);
        if (res.length >= n) break;
      }
    }
    return res;
  }

  orderMoveTo(cell, attackMove) {
    const game = this.game;
    const units = this.commandable();
    if (!units.length) return;
    const map = game.map;
    let ok = 0;
    if (attackMove || units.length === 1) {
      for (const u of units) {
        const r = attackMove ? game.orders.attack(u, { cell }) : game.orders.move(u, cell);
        if (r) ok++;
      }
    } else {
      const cells = this.spreadCells(cell, units.length);
      const pool = units.slice();
      for (const c of cells) {
        const cc = map.cells[c];
        pool.sort((a, b) => Math.hypot(a.x - cc.x, a.y - cc.y) - Math.hypot(b.x - cc.x, b.y - cc.y));
        const u = pool.shift();
        if (u && game.orders.move(u, c)) ok++;
      }
    }
    const c = map.cells[cell];
    if (ok) {
      this.app.effects.ring(c.x, c.y, LEAF, 46);
      this.app.audio.order();
    } else {
      this.flashHint("Can't find a route there");
    }
    this.mode = 'move';
  }

  orderAttackUnit(target) {
    const units = this.commandable();
    let ok = 0;
    for (const u of units) if (this.game.orders.attack(u, { unit: target })) ok++;
    if (ok) {
      this.app.effects.ring(target.x, target.y, STONE, 50);
      this.app.audio.order();
      this.flashHint(`${ok} battalion${ok > 1 ? 's' : ''} attacking ${target.short}`);
    } else this.flashHint("Can't reach that battalion");
    this.mode = 'move';
  }

  orderReinforce(target) {
    const units = this.commandable().filter((u) => u !== target);
    if (!units.length) {
      this.flashHint('Select other battalions to send as reinforcements');
      return;
    }
    let ok = 0;
    for (const u of units) if (this.game.orders.reinforce(u, target)) ok++;
    if (ok) {
      this.app.effects.ring(target.x, target.y, LEAF, 50);
      this.app.audio.order();
      this.flashHint(`${units.map((u) => u.short).join(', ')} → ${target.short}`);
    } else this.flashHint("Can't reach that battalion");
    this.mode = 'move';
  }

  // ---------------------------------------------------------------- input
  bind() {
    const gl = $('gl');
    gl.addEventListener('contextmenu', (e) => e.preventDefault());
    gl.addEventListener('pointerdown', (e) => this.onDown(e));
    window.addEventListener('pointermove', (e) => this.onMove(e));
    window.addEventListener('pointerup', (e) => this.onUp(e));
    window.addEventListener('pointercancel', (e) => this.onUp(e));
    gl.addEventListener('wheel', (e) => this.onWheel(e), { passive: false });
    gl.addEventListener('pointerleave', () => {
      this.mouse = null;
      this.setTooltip(null);
    });
    window.addEventListener('keydown', (e) => this.onKey(e, true));
    window.addEventListener('keyup', (e) => this.onKey(e, false));

    document.querySelectorAll('.obtn').forEach((b) => b.addEventListener('click', () => this.orderButton(b.dataset.order)));
    $('pauseBtn').addEventListener('click', () => this.togglePause());
    document.querySelectorAll('.speed').forEach((b) => b.addEventListener('click', () => this.setSpeed(+b.dataset.speed)));
    $('generalsBtn').addEventListener('click', () => this.openGenerals());
    $('helpBtn').addEventListener('click', () => this.openHelp());
    $('soundBtn').addEventListener('click', () => {
      const on = this.app.audio.toggle();
      $('soundBtn').textContent = on ? '🔊' : '🔈';
    });
  }

  onDown(e) {
    if (!this.game || !this.app.started) return;
    $('gl').setPointerCapture?.(e.pointerId);
    this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (this.pointers.size === 2) {
      const [a, b] = [...this.pointers.values()];
      this.pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), dist: this.rig.want.dist };
      this.drag = null;
      return;
    }
    const rig = this.rig;
    this.drag = {
      x0: e.clientX,
      y0: e.clientY,
      button: e.button,
      shift: e.shiftKey,
      moved: false,
      plane: rig.targetH,
      grab: rig.planeAt(e.clientX, e.clientY, rig.targetH),
      yaw0: rig.want.yaw,
    };
  }

  onMove(e) {
    this.mouse = { x: e.clientX, y: e.clientY };
    if (!this.game || !this.app.started) return;
    const rig = this.rig;
    if (this.pointers.has(e.pointerId)) this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (this.pinch && this.pointers.size === 2) {
      const [a, b] = [...this.pointers.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      rig.want.dist = clamp((this.pinch.dist * this.pinch.d) / Math.max(10, d), rig.minDist, rig.maxDist);
      return;
    }
    const d = this.drag;
    if (d) {
      const dx = e.clientX - d.x0;
      const dy = e.clientY - d.y0;
      if (!d.moved && Math.hypot(dx, dy) > 6) d.moved = true;
      if (d.moved) {
        if (d.button === 1 || (d.button === 2 && e.altKey)) {
          rig.want.yaw = d.yaw0 - dx * 0.006;
        } else if (d.shift && d.button === 0) {
          this.dragBox = { x0: d.x0, y0: d.y0, x1: e.clientX, y1: e.clientY };
        } else if (d.button === 0 || d.button === 2) {
          const cur = rig.planeAt(e.clientX, e.clientY, d.plane);
          if (cur && d.grab) {
            const ox = d.grab.x - cur.x;
            const oz = d.grab.z - cur.z;
            rig.want.x += ox;
            rig.want.z += oz;
            rig.cam.x += ox;
            rig.cam.z += oz;
          }
        }
        this.setTooltip(null);
        return;
      }
    }
    this.updateHover(e.clientX, e.clientY);
  }

  onUp(e) {
    this.pointers.delete(e.pointerId);
    if (this.pointers.size < 2) this.pinch = null;
    const d = this.drag;
    this.drag = null;
    if (!d || !this.game || !this.app.started) return;
    if (this.dragBox) {
      const b = this.dragBox;
      this.dragBox = null;
      const x0 = Math.min(b.x0, b.x1);
      const x1 = Math.max(b.x0, b.x1);
      const y0 = Math.min(b.y0, b.y1);
      const y1 = Math.max(b.y0, b.y1);
      const hits = this.app.hud.counterRects
        .filter((r) => r.u.side === LEAF)
        .filter((r) => {
          const cx = r.x + r.w / 2;
          const cy = r.y + r.h / 2;
          return (cx >= x0 && cx <= x1 && cy >= y0 && cy <= y1) || (r.fx >= x0 && r.fx <= x1 && r.fy >= y0 && r.fy <= y1);
        })
        .map((r) => r.u);
      if (hits.length) this.select(hits, e.shiftKey && this.selected.length > 0);
      return;
    }
    if (d.moved) return;
    this.click(e.clientX, e.clientY, d.button, e.shiftKey);
  }

  onWheel(e) {
    e.preventDefault();
    if (!this.game) return;
    const rig = this.rig;
    const before = rig.want.dist;
    const factor = Math.exp(clamp(e.deltaY, -120, 120) * 0.0016);
    rig.want.dist = clamp(before * factor, rig.minDist, rig.maxDist);
    // zoom toward the cursor
    const g = rig.planeAt(e.clientX, e.clientY, rig.targetH);
    if (g) {
      const k = 1 - rig.want.dist / before;
      rig.want.x += (g.x - rig.want.x) * k;
      rig.want.z += (g.z - rig.want.z) * k;
    }
  }

  onKey(e, down) {
    if (e.target && (e.target.tagName === 'SELECT' || e.target.tagName === 'INPUT')) return;
    const k = e.key.toLowerCase();
    if (down) this.keys.add(k);
    else this.keys.delete(k);
    if (!down || !this.game || !this.app.started) return;
    if (!$('generalsModal').classList.contains('hidden') || !$('helpModal').classList.contains('hidden')) {
      if (k === 'escape' || k === 'g' || k === 'h') this.closeModals();
      return;
    }
    if (this.game.over) return;
    switch (k) {
      case 'm':
        this.orderButton('move');
        break;
      case 'a':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          this.select(this.game.units.filter((u) => u.alive && u.side === LEAF));
        } else this.orderButton('attack');
        break;
      case 'd':
        this.orderButton('defend');
        break;
      case 'r':
        this.orderButton('retreat');
        break;
      case 'f':
        this.orderButton('reinforce');
        break;
      case 'escape':
        if (this.mode !== 'move') this.mode = 'move';
        else this.clearSelection();
        this.refreshPanels(true);
        break;
      case ' ':
        e.preventDefault();
        this.togglePause();
        break;
      case '1':
        this.setSpeed(1);
        break;
      case '2':
        this.setSpeed(2);
        break;
      case '3':
        this.setSpeed(4);
        break;
      case 'tab': {
        e.preventDefault();
        const mine = this.game.units.filter((u) => u.alive && u.side === LEAF);
        if (!mine.length) break;
        const cur = this.selected.length === 1 ? mine.indexOf(this.selected[0]) : -1;
        const next = mine[(cur + (e.shiftKey ? mine.length - 1 : 1)) % mine.length];
        this.select([next]);
        this.rig.flyTo(next.x, next.y);
        break;
      }
      case 'g':
        this.openGenerals();
        break;
      case 'h':
      case '?':
        this.openHelp();
        break;
      case 'home':
        this.rig.want.yaw = 0;
        this.rig.flyTo(1600, 1000, 2000);
        break;
      case 'b': {
        const b = this.currentBattle();
        if (b) this.rig.flyTo(b.x, b.y, Math.min(this.rig.want.dist, 700));
        break;
      }
      default:
        break;
    }
  }

  // continuous camera keys
  updateKeys(dt) {
    const rig = this.rig;
    if (!rig) return;
    let fx = 0;
    let fz = 0;
    if (this.keys.has('arrowup')) fz -= 1;
    if (this.keys.has('arrowdown')) fz += 1;
    if (this.keys.has('arrowleft')) fx -= 1;
    if (this.keys.has('arrowright')) fx += 1;
    if (fx || fz) {
      const sp = rig.want.dist * 1.1 * dt;
      const y = rig.want.yaw;
      rig.want.x += (fx * Math.cos(y) + fz * Math.sin(y)) * sp;
      rig.want.z += (-fx * Math.sin(y) + fz * Math.cos(y)) * sp;
    }
    if (this.keys.has('q')) rig.want.yaw += dt * 1.4;
    if (this.keys.has('e')) rig.want.yaw -= dt * 1.4;
    if (this.keys.has('+') || this.keys.has('=')) rig.want.dist = Math.max(rig.minDist, rig.want.dist * (1 - dt * 1.5));
    if (this.keys.has('-') || this.keys.has('_')) rig.want.dist = Math.min(rig.maxDist, rig.want.dist * (1 + dt * 1.5));
  }

  updateHover(sx, sy) {
    const hud = this.app.hud;
    const u = hud.unitAt(sx, sy);
    this.hover = u;
    if (u) {
      this.setTooltip(this.unitTooltip(u), sx, sy);
      return;
    }
    const b = hud.battleAt(sx, sy);
    if (b) {
      const s = this.game.combat.summary(b);
      const leafN = b.attSide === LEAF ? s.attSoldiers : s.defSoldiers;
      const stoneN = b.attSide === LEAF ? s.defSoldiers : s.attSoldiers;
      this.setTooltip(
        `<div class="tt-name" style="color:#ffc28a">⚔ Battle ${esc(b.place)}</div>${formatNum(leafN)} vs ${formatNum(stoneN)}<div class="muted">${this.commandable().length ? 'Click to send selected battalions as reinforcements' : 'Click to view this battle'}</div>`,
        sx,
        sy,
      );
      return;
    }
    this.setTooltip(null);
  }

  unitTooltip(u) {
    const game = this.game;
    const lvl = xpLevel(u.xp);
    const side = u.side === LEAF ? 'leaf' : 'stone';
    let action = '';
    if (u.side === STONE && this.commandable().length) action = '<div style="color:#ff8a6a;font-weight:700">Click to ATTACK</div>';
    else if (u.side === LEAF && this.mode === 'reinforce') action = '<div style="color:#5cd4ff;font-weight:700">Click to REINFORCE</div>';
    const gen = game.general(u);
    return `<div class="tt-name ${side}">${esc(u.name)}</div>
      <div class="muted">${UNIT_TYPES[u.type].name} · ${lvl.name}${gen ? ' · Gen. ' + esc(gen.name) : ''}</div>
      <div>${formatNum(u.soldiers)} / ${formatNum(u.max)} soldiers</div>
      <div>Morale ${pct(u.morale)} · Org ${pct(u.org)}</div>
      <div class="muted">${unitStatus(game, u)}</div>${action}`;
  }

  setTooltip(html, x, y) {
    const tt = $('tooltip');
    if (!html) {
      tt.classList.remove('show');
      return;
    }
    tt.innerHTML = html;
    tt.classList.add('show');
    const w = tt.offsetWidth;
    const h = tt.offsetHeight;
    let tx = x + 18;
    let ty = y + 14;
    if (tx + w > window.innerWidth - 8) tx = x - w - 14;
    if (ty + h > window.innerHeight - 8) ty = y - h - 10;
    tt.style.left = tx + 'px';
    tt.style.top = ty + 'px';
  }

  click(sx, sy, button, shift) {
    const game = this.game;
    if (game.over) return;
    const hud = this.app.hud;
    const hit = hud.unitAt(sx, sy);
    const battle = hit ? null : hud.battleAt(sx, sy);
    const cmd = this.commandable();

    if (button === 2) {
      if (this.mode !== 'move') {
        this.mode = 'move';
        this.refreshPanels(true);
        return;
      }
      if (!cmd.length) return;
    }

    if (this.mode === 'reinforce' && cmd.length) {
      if (hit && hit.side === LEAF) return this.orderReinforce(hit);
      if (battle) {
        const friend = [...battle.attackers, ...battle.defenders].find((u) => u.side === LEAF);
        if (friend) return this.orderReinforce(friend);
      }
      this.flashHint('Pick a friendly battalion to reinforce');
      return;
    }

    if (hit) {
      if (hit.side === LEAF) {
        if (button === 2 && cmd.length && hit.battle) return this.orderReinforce(hit);
        if (button === 2 && cmd.length) {
          this.orderMoveTo(hit.cell, false);
          return;
        }
        // double click selects the whole army
        const now = performance.now();
        if (this.lastClick.u === hit && now - this.lastClick.t < 350 && hit.army) {
          this.select(game.units.filter((o) => o.alive && o.side === LEAF && o.army === hit.army));
        } else {
          this.select([hit], shift);
        }
        this.lastClick = { t: now, u: hit };
        return;
      }
      if (cmd.length) return this.orderAttackUnit(hit);
      this.select([hit]);
      return;
    }

    if (battle) {
      if (cmd.length) {
        const friend = [...battle.attackers, ...battle.defenders].find((u) => u.side === LEAF);
        if (friend && !cmd.includes(friend)) return this.orderReinforce(friend);
      }
      this.focusBattle = battle;
      this.refreshPanels(true);
      return;
    }

    const g = this.rig.groundAt(sx, sy);
    if (!g) return;
    const cell = game.map.cellAt(g.x, g.z);
    if (cell < 0) return;
    if (!cmd.length) {
      if (this.selected.length) this.clearSelection();
      return;
    }
    if (!game.map.cells[cell].passable) {
      this.flashHint("Battalions can't go there");
      return;
    }
    const enemyCell = game.map.cells[cell].owner === STONE && game.enemiesInCell(LEAF, cell).length;
    this.orderMoveTo(cell, this.mode === 'attack' || !!enemyCell);
  }

  // ---------------------------------------------------------------- time
  togglePause() {
    const game = this.game;
    if (!game || game.over) return;
    game.paused = !game.paused;
    $('pauseBtn').classList.toggle('paused', game.paused);
    $('pauseBtn').textContent = game.paused ? '▶' : '❚❚';
    $('pausedTag').classList.toggle('hidden', !game.paused);
  }

  setSpeed(s) {
    if (!this.game) return;
    this.game.speed = s;
    if (this.game.paused) this.togglePause();
    document.querySelectorAll('.speed').forEach((b) => b.classList.toggle('active', +b.dataset.speed === s));
  }

  // ---------------------------------------------------------------- feed + banners
  addFeed(item) {
    const d = this.game.dateString();
    item.when = `D${d.day} ${d.hour}`;
    for (const f of this.feed) f.fresh = false;
    item.fresh = true;
    this.feed.unshift(item);
    if (this.feed.length > 60) this.feed.pop();
    this.renderFeed();
    if (item.alert) this.app.audio.alert();
  }

  renderFeed() {
    const el = $('feed');
    el.innerHTML =
      '<h3>BATTLE REPORTS</h3>' +
      this.feed
        .slice(0, 18)
        .map(
          (f, i) =>
            `<div class="feed-item ${f.kind || 'info'} ${f.alert ? 'alert' : ''} ${f.fresh ? 'fresh' : ''}" data-i="${i}"><span class="fi">${f.icon || '•'}</span><span class="fx">${esc(f.text)}</span><span class="ft">${f.when}</span></div>`,
        )
        .join('');
    el.querySelectorAll('.feed-item').forEach((n) =>
      n.addEventListener('click', () => {
        const f = this.feed[+n.dataset.i];
        this.jumpTo(f);
      }),
    );
  }

  jumpTo(f) {
    const map = this.game.map;
    let x = f.x;
    let y = f.y;
    if (f.battle) {
      x = f.battle.x;
      y = f.battle.y;
      if (!f.battle.over) this.focusBattle = f.battle;
    } else if (f.unit && f.unit.alive) {
      x = f.unit.x;
      y = f.unit.y;
      if (f.unit.side === LEAF) this.select([f.unit]);
    } else if (f.cell !== undefined) {
      x = map.cells[f.cell].x;
      y = map.cells[f.cell].y;
    }
    if (x !== undefined) this.rig.flyTo(x, y, Math.min(this.rig.want.dist, 800));
    this.refreshPanels(true);
  }

  banner(b) {
    this.bannerQueue.push(b);
    if (this.bannerQueue.length > 4) this.bannerQueue.shift();
    if (!this.bannerBusy) this.nextBanner();
  }

  nextBanner() {
    const b = this.bannerQueue.shift();
    const el = $('banner');
    if (!b) {
      this.bannerBusy = false;
      return;
    }
    this.bannerBusy = true;
    el.className = `${b.kind || 'info'} ${b.big ? 'big' : ''}`;
    el.innerHTML = `<div class="bt">${esc(b.text)}</div><div class="rule"></div><div class="bs">${esc(b.sub || '')}</div>`;
    requestAnimationFrame(() => el.classList.add('show'));
    if (b.kind === 'good') this.app.audio.fanfare(true);
    else if (b.kind === 'bad') this.app.audio.fanfare(false);
    setTimeout(() => {
      el.classList.remove('show');
      setTimeout(() => this.nextBanner(), 450);
    }, b.big ? 3600 : 2500);
  }

  hintHtml() {
    const sel = this.selected;
    if (!sel.length) return HINTS.none;
    if (sel.every((u) => u.side === STONE)) return HINTS.enemy;
    if (!this.commandable().length) return HINTS.routed;
    return HINTS[this.mode] || HINTS.move;
  }

  flashHint(text) {
    this.hintFlash = { text, until: performance.now() + 2200 };
    $('hint').innerHTML = esc(text);
  }

  // ---------------------------------------------------------------- panels
  refreshPanels(force) {
    this.lastPanel = force ? 0 : this.lastPanel;
  }

  update(dt) {
    const now = performance.now();
    this.updateKeys(dt);
    if (now - this.lastPanel > 220) {
      this.lastPanel = now;
      this.selected = this.selected.filter((u) => u.alive);
      if (this.focusBattle && this.focusBattle.over && now - this.focusBattle.endTime > 0) {
        /* keep showing result briefly */
      }
      this.renderUnitPanel();
      this.renderBattlePanel();
      this.renderOrders();
    }
    if (now - this.lastTop > 500) {
      this.lastTop = now;
      this.renderTop();
    }
  }

  renderOrders() {
    const cmd = this.commandable();
    document.querySelectorAll('.obtn').forEach((b) => {
      b.disabled = !cmd.length;
      b.classList.toggle('active', cmd.length > 0 && b.dataset.order === this.mode && this.mode !== 'move');
    });
    if (!this.hintFlash || performance.now() > this.hintFlash.until) {
      this.hintFlash = null;
      $('hint').innerHTML = this.hintHtml();
    }
  }

  renderTop() {
    const game = this.game;
    const d = game.dateString();
    $('date').textContent = `Year ${d.year} · Day ${d.day} · ${d.hour}`;
    const w = game.weather.type;
    const wEl = $('weather');
    wEl.textContent = w === 'rain' ? '🌧 Heavy Rain' : w === 'fog' ? '🌫 Fog' : '☀ Clear';
    wEl.className = 'chip ' + w;
    const share = game.territory.controlShare();
    $('leafPct').textContent = Math.round(share * 100) + '%';
    $('stonePct').textContent = Math.round((1 - share) * 100) + '%';
    $('leafBar').style.width = share * 100 + '%';
    $('collapse').textContent = game.collapsing[STONE] ? 'ENEMY FRONT COLLAPSING' : game.collapsing[LEAF] ? 'OUR FRONT IS COLLAPSING' : '';
    const map = game.map;
    const objEl = $('objectives');
    objEl.innerHTML = OBJECTIVES[LEAF]
      .map((k) => {
        const l = map.locByKey[k];
        const held = l.owner === LEAF;
        return `<div class="obj ${held ? 'held' : ''}" data-k="${k}" title="${esc(l.name)} — ${held ? 'captured' : 'capture this objective'}"><span class="ic">${held ? '✓' : '◎'}</span><span class="nm">${esc(l.name)}</span></div>`;
      })
      .join('');
    objEl.querySelectorAll('.obj').forEach((n) =>
      n.addEventListener('click', () => {
        const l = map.locByKey[n.dataset.k];
        this.rig.flyTo(l.x, l.y, Math.min(this.rig.want.dist, 900));
      }),
    );
  }

  bar(cls, v) {
    return `<div class="bar ${cls}"><i style="width:${clamp(v, 0, 1) * 100}%"></i></div>`;
  }

  strengthCls(f) {
    return f > 0.6 ? '' : f > 0.33 ? 'mid' : 'low';
  }

  renderUnitPanel() {
    const el = $('leftPanel');
    const game = this.game;
    const sel = this.selected;
    if (!sel.length) {
      el.innerHTML = this.rosterHtml();
      el.querySelectorAll('[data-uid]').forEach((n) =>
        n.addEventListener('click', () => {
          const u = game.unitById.get(+n.dataset.uid);
          if (!u) return;
          this.select([u]);
          this.rig.flyTo(u.x, u.y, Math.min(this.rig.want.dist, 900));
        }),
      );
      return;
    }
    if (sel.length > 1) {
      el.innerHTML =
        `<h3>${sel.length} BATTALIONS SELECTED</h3>` +
        sel
          .map(
            (u) => `<div class="multi-row" data-uid="${u.id}"><span class="nm">${esc(u.short)}</span><span class="muted" style="text-align:right;font-size:11px">${formatNum(u.soldiers)}</span>
          ${this.bar('str ' + this.strengthCls(u.soldiers / u.max), u.soldiers / u.max)}${this.bar('mor', u.morale)}</div>`,
          )
          .join('') +
        `<div class="panel-actions"><button class="sbtn" id="clearSel">CLEAR</button></div>`;
      el.querySelectorAll('[data-uid]').forEach((n) =>
        n.addEventListener('click', () => {
          const u = game.unitById.get(+n.dataset.uid);
          if (u) {
            this.select([u]);
            this.rig.flyTo(u.x, u.y);
          }
        }),
      );
      $('clearSel').addEventListener('click', () => this.clearSelection());
      return;
    }
    const u = sel[0];
    const lvl = xpLevel(u.xp);
    const sf = u.soldiers / u.max;
    const map = game.map;
    const cell = map.cells[u.cell];
    const loc = cell.loc !== null ? map.locations[cell.loc] : null;
    const terrain = loc && loc.type !== 'village' && loc.type !== 'bridge' ? `${loc.name} (${LOCATION_TYPES[loc.type].name})` : TERRAIN[cell.terrain].name;
    const gen = game.general(u);
    const army = game.armies[u.army];
    const status = unitStatus(game, u);
    const stCls = u.battle ? 'battle' : u.routed || u.surrounded ? 'bad' : u.stance === 'defend' ? 'good' : '';
    const enemy = u.side === STONE;
    let extra = '';
    if (u.battle) {
      const foes = u.role === 'att' ? u.battle.defenders : u.battle.attackers;
      extra = `<div class="muted" style="margin-top:6px;font-size:12px">Fighting ${esc(foes.map((f) => f.short).join(', '))} ${esc(u.battle.place)}</div>`;
    } else if (u.path.length) {
      extra = `<div class="muted" style="margin-top:6px;font-size:12px">Arrives in ~${Math.max(1, Math.round(etaHours(game, u)))}h</div>`;
    }
    el.innerHTML = `
      ${enemy ? '<div class="enemy-tag">ENEMY BATTALION</div>' : ''}
      <div class="unit-head">
        <canvas class="nato ${enemy ? 'stone' : 'leaf'}" id="natoIcon" width="92" height="64"></canvas>
        <div>
          <div class="unit-name">${esc(u.name)}</div>
          <div class="unit-sub">${UNIT_TYPES[u.type].name} · <span class="stars">${'★'.repeat(lvl.stars)}${'☆'.repeat(3 - lvl.stars)}</span> ${lvl.name}</div>
        </div>
      </div>
      <div class="stat"><div class="stat-row"><span>Soldiers</span><b>${formatNum(u.soldiers)} / ${formatNum(u.max)}</b></div>${this.bar('str ' + this.strengthCls(sf), sf)}</div>
      <div class="stat"><div class="stat-row"><span>Morale</span><b>${pct(u.morale)}</b></div>${this.bar('mor', u.morale)}</div>
      <div class="stat"><div class="stat-row"><span>Organization</span><b>${pct(u.org)}</b></div>${this.bar('org', u.org)}</div>
      <div class="kv">
        <span>Commander</span><b>Captain ${esc(u.captain)}</b>
        <span>Army</span><b>${army ? esc(army.name) : '—'}</b>
        <span>General</span><b>${gen ? `${esc(gen.name)} <span class="stars">${TRAITS[gen.trait].icon}</span> ${gen.trait}${gen.woundedUntil > game.time ? ' (wounded)' : ''}` : '—'}</b>
        <span>Position</span><b>${esc(terrain)}</b>
        ${u.entrench > 0.05 ? `<span>Dug in</span><b>+${Math.round(u.entrench * 40)}% defense</b>` : ''}
      </div>
      <div class="status ${stCls}">${u.battle ? '⚔' : u.routed ? '⚐' : u.stance === 'defend' ? '⛨' : '●'} ${esc(status)}</div>
      ${extra}
      ${enemy ? '' : `<div class="panel-actions"><button class="sbtn" id="selArmy">SELECT ARMY</button><button class="sbtn" id="nextUnit">NEXT ▶</button></div>`}
    `;
    this.drawNato($('natoIcon'), u);
    if (!enemy) {
      $('selArmy').addEventListener('click', () => this.select(game.units.filter((o) => o.alive && o.side === LEAF && o.army === u.army)));
      $('nextUnit').addEventListener('click', () => this.onKey({ key: 'Tab', preventDefault() {}, shiftKey: false, target: null }, true));
    }
  }

  drawNato(canvas, u) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.scale(2, 2);
    this.app.hud.symbol(ctx, u.type, 23, 16, 46, 32);
  }

  rosterHtml() {
    const game = this.game;
    const groups = Object.values(game.armies).filter((a) => a.side === LEAF);
    let html = '<h3>YOUR BATTALIONS</h3><div class="empty-card" style="margin-bottom:8px">Click a battalion here or on the map. Double-click on the map selects its whole army.</div>';
    for (const a of groups) {
      const units = game.units.filter((u) => u.alive && u.side === LEAF && u.army === a.id);
      if (!units.length) continue;
      const g = game.generals[a.general];
      html += `<div style="margin:10px 0 4px;font-family:var(--heading);font-weight:700;letter-spacing:.08em;color:#cfd8cf">${esc(a.name)} <span class="muted" style="font-weight:600">— ${g ? esc(g.name) : 'no general'}</span></div>`;
      for (const u of units) {
        const st = u.battle ? '⚔' : u.routed ? '⚐' : u.moving ? '➜' : u.stance === 'defend' ? '⛨' : '';
        html += `<div class="multi-row" data-uid="${u.id}"><span class="nm">${st} ${esc(u.short)}</span><span class="muted" style="text-align:right;font-size:11px">${formatNum(u.soldiers)}</span>${this.bar('str ' + this.strengthCls(u.soldiers / u.max), u.soldiers / u.max)}${this.bar('mor', u.morale)}</div>`;
      }
    }
    return html;
  }

  currentBattle() {
    const game = this.game;
    const active = game.combat.battles.filter((b) => !b.over);
    if (this.focusBattle && (!this.focusBattle.over || game.time - this.focusBattle.endTime < 3)) return this.focusBattle;
    const sel = this.selected[0];
    if (sel && sel.battle) return sel.battle;
    if (!active.length) return null;
    this.battleIdx = clamp(this.battleIdx, 0, active.length - 1);
    return active[this.battleIdx];
  }

  renderBattlePanel() {
    const el = $('battlePanel');
    const game = this.game;
    const active = game.combat.battles.filter((b) => !b.over);
    const b = this.currentBattle();
    if (!b) {
      el.innerHTML = `<h3>BATTLE</h3><div class="empty-card">The front is quiet. Select a battalion and click a <b style="color:#ff8a6a">red enemy battalion</b> to attack.</div>`;
      return;
    }
    const s = game.combat.summary(b);
    const leafAtt = b.attSide === LEAF;
    const L = leafAtt ? b.attackers : b.defenders;
    const S = leafAtt ? b.defenders : b.attackers;
    const ln = leafAtt ? s.attSoldiers : s.defSoldiers;
    const sn = leafAtt ? s.defSoldiers : s.attSoldiers;
    const lm = leafAtt ? s.attMorale : s.defMorale;
    const sm = leafAtt ? s.defMorale : s.attMorale;
    const lo = leafAtt ? s.attOrg : s.defOrg;
    const so = leafAtt ? s.defOrg : s.attOrg;
    const share = leafAtt ? b.adv : 1 - b.adv;
    const names = (list) => (list.length ? esc(list[0].short) + (list.length > 1 ? ` +${list.length - 1}` : '') : '—');
    const idx = active.indexOf(b);
    const cell = game.map.cells[b.cell];
    const loc = cell.loc !== null ? game.map.locations[cell.loc] : null;
    const terrainName = loc && loc.type !== 'village' && loc.type !== 'bridge' ? LOCATION_TYPES[loc.type].name : TERRAIN[cell.terrain].name;
    const notes = [];
    notes.push(`${leafAtt ? 'Enemy defends' : 'We defend'}: ${terrainName} ${s.terrain > 1.01 ? `(+${Math.round((s.terrain - 1) * 100)}% defense)` : ''}`);
    const river = b.attackers.some((a) => game.map.edge(a.cell, b.cell)?.river);
    if (river) notes.push('Attackers crossing a river');
    if (game.weather.type !== 'clear') notes.push(game.weather.type === 'rain' ? 'Rain hampers the attack' : 'Fog over the battlefield');
    for (const r of s.incoming) {
      if (r.side !== LEAF) continue;
      notes.push(`<span class="reinf">→ ${esc(r.short)} arriving (~${Math.max(1, Math.round(etaHours(game, r)))}h)</span>`);
    }
    const enemyIncoming = s.incoming.filter((r) => r.side === STONE && game.isVisible(r));
    if (enemyIncoming.length) notes.push(`<span style="color:#ff9a86">⚠ Enemy reinforcements approaching</span>`);
    let title = `⚔ BATTLE ${esc(b.place.toUpperCase())}`;
    if (b.over) title = b.winner === LEAF ? '✓ VICTORY ' + esc(b.place.toUpperCase()) : '✗ DEFEAT ' + esc(b.place.toUpperCase());
    el.innerHTML = `
      <div class="battle-title"><span>${title}</span><span class="nav">${active.length > 1 ? `<button id="bPrev">◀</button><span style="font-size:12px;color:var(--muted);padding:3px 2px">${idx + 1}/${active.length}</span><button id="bNext">▶</button>` : ''}<button id="bJump" title="Jump to battle (B)">◎</button></span></div>
      <div class="versus">
        <div class="side"><div class="nm leaf">${names(L)}</div><div class="big">${formatNum(ln)}</div><div class="small">Morale ${pct(lm)}</div>${this.bar('org', lo)}</div>
        <div class="vs">VS</div>
        <div class="side right"><div class="nm stone">${names(S)}</div><div class="big">${formatNum(sn)}</div><div class="small">Morale ${pct(sm)}</div>${this.bar('org', so)}</div>
      </div>
      <div class="adv"><div class="adv-track"><i style="width:${share * 100}%"></i></div>
      <div class="adv-label"><span>${share > 0.55 ? 'We are winning' : share < 0.45 ? 'We are losing' : 'Evenly matched'}</span><span>${Math.round(b.hours)}h of fighting</span></div></div>
      <div class="battle-notes">${notes.join('<br>')}</div>
      <div class="battle-log">${b.log
        .slice(0, 3)
        .map((l) => `<div>${esc(l.text)}</div>`)
        .join('')}</div>`;
    const go = (d) => {
      this.focusBattle = null;
      this.battleIdx = (idx + d + active.length) % active.length;
      const nb = active[this.battleIdx];
      this.focusBattle = nb;
      this.rig.flyTo(nb.x, nb.y);
      this.refreshPanels(true);
    };
    $('bPrev')?.addEventListener('click', () => go(-1));
    $('bNext')?.addEventListener('click', () => go(1));
    $('bJump')?.addEventListener('click', () => this.rig.flyTo(b.x, b.y, Math.min(this.rig.want.dist, 700)));
  }

  // ---------------------------------------------------------------- modals
  closeModals() {
    $('generalsModal').classList.add('hidden');
    $('helpModal').classList.add('hidden');
    if (this.pausedByModal && this.game.paused) this.togglePause();
    this.pausedByModal = false;
  }

  pauseForModal() {
    if (!this.game.paused) {
      this.togglePause();
      this.pausedByModal = true;
    }
  }

  openGenerals() {
    const game = this.game;
    this.pauseForModal();
    const el = $('generalsModal');
    el.classList.remove('hidden');
    const leafGens = Object.values(game.generals).filter((g) => g.side === LEAF);
    const armies = Object.values(game.armies).filter((a) => a.side === LEAF);
    const initials = (n) => n.split(' ').map((p) => p[0]).join('').slice(0, 2);
    const genCard = (g, stone) =>
      g
        ? `<div class="general"><div class="portrait ${stone ? 'stone' : ''} ${g.woundedUntil > game.time ? 'wounded' : ''}">${initials(g.name)}</div><div><div class="gname">General ${esc(g.name)}</div><div class="gtrait"><b>${TRAITS[g.trait].icon} ${g.trait}</b> — ${TRAITS[g.trait].desc}${g.woundedUntil > game.time ? ' <span style="color:#ff9a86">(wounded)</span>' : ''}</div></div></div>`
        : `<div class="general"><div class="portrait">?</div><div class="gname">No general</div></div>`;
    const reserve = leafGens.filter((g) => !armies.some((a) => a.general === g.id));
    el.innerHTML = `<div class="modal-card">
      <div class="modal-head"><div><h2>★ GENERALS</h2><p class="lead">Each army fights under one general. Swap generals to match the job: Aggressive for the main push, Defensive for holding a sector, Strategist where several battalions attack together.</p></div><button class="close" id="genClose">✕</button></div>
      <div class="armies">${armies
        .map((a) => {
          const g = game.generals[a.general];
          const units = game.units.filter((u) => u.alive && u.side === LEAF && u.army === a.id);
          return `<div class="army"><h4>${esc(a.name)}</h4>${genCard(g)}
            <select data-army="${a.id}">${leafGens
              .map((lg) => `<option value="${lg.id}" ${lg.id === a.general ? 'selected' : ''}>${esc(lg.name)} — ${lg.trait}${armies.find((o) => o.general === lg.id && o !== a) ? ' (swap)' : ''}</option>`)
              .join('')}</select>
            <div style="margin-top:8px">${units
              .map(
                (u) => `<div class="bat-chip" data-uid="${u.id}"><span>${esc(u.name)}</span><select data-unit="${u.id}">${armies
                  .map((o) => `<option value="${o.id}" ${o.id === a.id ? 'selected' : ''}>${esc(o.name)}</option>`)
                  .join('')}</select></div>`,
              )
              .join('')}</div></div>`;
        })
        .join('')}</div>
      ${reserve.length ? `<h3 style="margin-top:16px">IN RESERVE</h3><div class="enemy-gens">${reserve.map((g) => genCard(g)).join('')}</div>` : ''}
      <h3 style="margin-top:18px;color:#ff9a86">ENEMY COMMANDERS</h3>
      <div class="enemy-gens">${Object.values(game.armies)
        .filter((a) => a.side === STONE)
        .map((a) => `<div>${genCard(game.generals[a.general], true)}<div class="muted" style="font-size:11px;margin:4px 0 0 54px">${esc(a.name)}</div></div>`)
        .join('')}</div>
    </div>`;
    $('genClose').addEventListener('click', () => this.closeModals());
    el.onclick = (e) => {
      if (e.target === el) this.closeModals();
    };
    el.querySelectorAll('select[data-army]').forEach((s) =>
      s.addEventListener('change', () => {
        const a = game.armies[s.dataset.army];
        const other = armies.find((o) => o.general === s.value && o !== a);
        if (other) other.general = a.general;
        a.general = s.value;
        this.app.audio.order();
        this.addFeed({ kind: 'info', icon: '★', text: `General ${game.generals[s.value].name} takes command of the ${a.name}` });
        this.openGenerals();
      }),
    );
    el.querySelectorAll('select[data-unit]').forEach((s) =>
      s.addEventListener('change', () => {
        const u = game.unitById.get(+s.dataset.unit);
        if (u) u.army = s.value;
        this.openGenerals();
      }),
    );
  }

  openHelp() {
    this.pauseForModal();
    const el = $('helpModal');
    el.classList.remove('hidden');
    const rows = [
      ['Select battalion', '<kbd>Click</kbd>'],
      ['Add to selection', '<kbd>Shift</kbd>+<kbd>Click</kbd>'],
      ['Box select', '<kbd>Shift</kbd>+<kbd>Drag</kbd>'],
      ['Select whole army', '<kbd>Double-click</kbd>'],
      ['Select all battalions', '<kbd>Ctrl</kbd>+<kbd>A</kbd>'],
      ['Next battalion', '<kbd>Tab</kbd>'],
      ['Move (default)', '<kbd>Click</kbd> map / <kbd>M</kbd>'],
      ['Attack', '<kbd>Click</kbd> enemy / <kbd>A</kbd>'],
      ['Defend (dig in)', '<kbd>D</kbd>'],
      ['Retreat', '<kbd>R</kbd>'],
      ['Reinforce', '<kbd>F</kbd> then click friend'],
      ['Contextual order', '<kbd>Right-click</kbd>'],
      ['Pan camera', '<kbd>Drag</kbd> / <kbd>Arrows</kbd>'],
      ['Zoom', '<kbd>Wheel</kbd> / <kbd>+</kbd><kbd>−</kbd>'],
      ['Rotate camera', '<kbd>Q</kbd> <kbd>E</kbd> / middle-drag'],
      ['Jump to battle', '<kbd>B</kbd>'],
      ['Pause', '<kbd>Space</kbd>'],
      ['Speed 1× / 2× / 4×', '<kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd>'],
      ['Generals', '<kbd>G</kbd>'],
      ['Cancel / deselect', '<kbd>Esc</kbd>'],
    ];
    el.innerHTML = `<div class="modal-card"><div class="modal-head"><div><h2>FIELD MANUAL</h2><p class="lead">Those are your battalions (green). That's the enemy (red). The glowing line is the front. Push them back.</p></div><button class="close" id="helpClose">✕</button></div>
      <div class="help-grid">${rows.map(([a, b]) => `<div><span>${a}</span><span>${b}</span></div>`).join('')}</div>
      <div class="help-tips">
        <b>Battles take time.</b> Watch the balance bar — send more battalions with <b>REINFORCE</b> to tip a fight.<br>
        <b>Terrain matters.</b> Forests, mountains, towns and forts make defenders much stronger. Attacking across a river is costly — use bridges.<br>
        <b>Dig in.</b> A battalion ordered to <b>DEFEND</b> entrenches over a few hours and becomes very hard to dislodge.<br>
        <b>Morale and organization</b> drain in combat. At zero a battalion breaks and retreats. Pull tired units back to towns to recover; the Medical Battalion heals nearby friends.<br>
        <b>Don't get surrounded.</b> Battalions cut off from friendly towns can't recover — and may surrender.<br>
        <b>Win</b> by capturing the four ◎ objectives or the enemy capital Kharzad. Lose Sennai and the war is lost.
      </div></div>`;
    $('helpClose').addEventListener('click', () => this.closeModals());
    el.onclick = (e) => {
      if (e.target === el) this.closeModals();
    };
  }

  showEnd(over) {
    const game = this.game;
    const win = over.winner === LEAF;
    const el = $('endScreen');
    el.classList.remove('hidden');
    const d = game.dateString();
    const share = Math.round(game.territory.controlShare() * 100);
    el.innerHTML = `<div class="modal-card end-card">
      <div class="kicker">${win ? 'THE WAR IS WON' : 'THE WAR IS LOST'}</div>
      <div class="end-title ${win ? 'win' : 'lose'}">${win ? 'VICTORY' : 'DEFEAT'}</div>
      <div class="end-reason">${esc(over.reason)}</div>
      <div class="end-stats">
        <div><b>${d.day}</b><span>DAYS OF WAR</span></div>
        <div><b>${game.stats.battles}</b><span>BATTLES FOUGHT</span></div>
        <div><b>${game.stats.battlesWon}</b><span>BATTLES WON</span></div>
        <div><b>${game.stats.enemyDestroyed}</b><span>ENEMY BATTALIONS DESTROYED</span></div>
        <div><b>${game.stats.unitsLost}</b><span>BATTALIONS LOST</span></div>
        <div><b>${share}%</b><span>TERRITORY HELD</span></div>
      </div>
      <button class="start" id="againBtn">NEW WAR</button>
    </div>`;
    $('againBtn').addEventListener('click', () => location.reload());
    this.app.audio.fanfare(win, true);
  }
}

export { findPath, SIDES };
