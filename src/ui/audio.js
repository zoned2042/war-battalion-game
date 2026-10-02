// Synthesized sound: gunfire, explosions, UI blips and fanfares. No assets.

export class Sound {
  constructor() {
    this.ctx = null;
    this.on = true;
    this.lastBoom = 0;
    this.lastAlert = 0;
    this.crackleAcc = 0;
  }

  init() {
    if (this.ctx) return;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new Ctx();
    } catch {
      this.ctx = null;
      return;
    }
    const ctx = this.ctx;
    this.master = ctx.createGain();
    this.master.gain.value = 0.55;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.ratio.value = 6;
    this.master.connect(comp);
    comp.connect(ctx.destination);
    const len = ctx.sampleRate * 2;
    this.noise = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = this.noise.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    // distant wind
    const wind = ctx.createBufferSource();
    wind.buffer = this.noise;
    wind.loop = true;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 380;
    const g = ctx.createGain();
    g.gain.value = 0.035;
    wind.connect(lp).connect(g).connect(this.master);
    wind.start();
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  }

  toggle() {
    this.on = !this.on;
    if (this.master) this.master.gain.value = this.on ? 0.55 : 0;
    return this.on;
  }

  ok() {
    return this.ctx && this.on;
  }

  burst({ dur = 0.1, freq = 1000, type = 'bandpass', q = 1, gain = 0.2, decay = dur, delay = 0 }) {
    const ctx = this.ctx;
    const t = ctx.currentTime + delay;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    const f = ctx.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    f.Q.value = q;
    const g = ctx.createGain();
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + decay);
    src.connect(f).connect(g).connect(this.master);
    src.start(t, Math.random() * 1.5);
    src.stop(t + decay + 0.05);
  }

  tone(freq, dur, type = 'sine', gain = 0.08, delay = 0, slideTo = null) {
    const ctx = this.ctx;
    const t = ctx.currentTime + delay;
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(this.master);
    o.start(t);
    o.stop(t + dur + 0.05);
  }

  click() {
    if (!this.ok()) return;
    this.tone(880, 0.05, 'sine', 0.05);
  }

  order() {
    if (!this.ok()) return;
    this.tone(520, 0.07, 'triangle', 0.08);
    this.tone(780, 0.09, 'triangle', 0.08, 0.06);
  }

  alert() {
    if (!this.ok()) return;
    const now = performance.now();
    if (now - this.lastAlert < 1500) return;
    this.lastAlert = now;
    this.tone(660, 0.12, 'square', 0.035);
    this.tone(440, 0.16, 'square', 0.035, 0.13);
  }

  fanfare(good, big = false) {
    if (!this.ok()) return;
    const notes = good ? [523, 659, 784, big ? 1047 : 0] : [440, 392, 330, big ? 262 : 0];
    notes.forEach((n, i) => n && this.tone(n, big ? 0.5 : 0.28, 'triangle', 0.07, i * (big ? 0.16 : 0.1)));
  }

  explosion(vol = 1) {
    if (!this.ok() || vol < 0.03) return;
    const now = performance.now();
    if (now - this.lastBoom < 70) return;
    this.lastBoom = now;
    this.burst({ dur: 1.1, freq: 380 + Math.random() * 200, type: 'lowpass', q: 0.7, gain: 0.5 * vol, decay: 1.0 });
    this.tone(60 + Math.random() * 20, 0.45, 'sine', 0.35 * vol, 0, 30);
  }

  // Called every frame with how much fighting is audible (0..1).
  battle(level, dt) {
    if (!this.ok() || level < 0.02) return;
    this.crackleAcc += dt * level * 26;
    while (this.crackleAcc > 1) {
      this.crackleAcc -= 1;
      const delay = Math.random() * 0.05;
      this.burst({
        dur: 0.06,
        freq: 1800 + Math.random() * 1800,
        type: 'bandpass',
        q: 1.2,
        gain: (0.05 + Math.random() * 0.07) * Math.min(1, level * 1.4),
        decay: 0.05 + Math.random() * 0.05,
        delay,
      });
    }
  }
}
