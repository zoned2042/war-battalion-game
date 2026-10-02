// Seeded random numbers and 2D value noise. Everything that shapes the map is
// deterministic so the same seed always produces the same battlefield.

export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export class Rng {
  constructor(seed) {
    this.next = mulberry32(seed);
  }
  float(min = 0, max = 1) {
    return min + (max - min) * this.next();
  }
  int(min, max) {
    return Math.floor(this.float(min, max + 1));
  }
  pick(arr) {
    return arr[Math.floor(this.next() * arr.length)];
  }
  chance(p) {
    return this.next() < p;
  }
  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}

// Gradient-free value noise on an integer lattice with quintic smoothing.
export class Noise2D {
  constructor(seed) {
    const rnd = mulberry32(seed);
    this.perm = new Uint16Array(512);
    this.vals = new Float32Array(256);
    const p = [];
    for (let i = 0; i < 256; i++) {
      p.push(i);
      this.vals[i] = rnd() * 2 - 1;
    }
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [p[i], p[j]] = [p[j], p[i]];
    }
    for (let i = 0; i < 512; i++) this.perm[i] = p[i & 255];
  }
  lattice(ix, iy) {
    return this.vals[this.perm[(this.perm[ix & 255] + iy) & 511]];
  }
  // Returns roughly -1..1
  get(x, y) {
    const ix = Math.floor(x);
    const iy = Math.floor(y);
    const fx = x - ix;
    const fy = y - iy;
    const ux = fx * fx * fx * (fx * (fx * 6 - 15) + 10);
    const uy = fy * fy * fy * (fy * (fy * 6 - 15) + 10);
    const a = this.lattice(ix, iy);
    const b = this.lattice(ix + 1, iy);
    const c = this.lattice(ix, iy + 1);
    const d = this.lattice(ix + 1, iy + 1);
    const ab = a + (b - a) * ux;
    const cd = c + (d - c) * ux;
    return ab + (cd - ab) * uy;
  }
  fbm(x, y, octaves = 4, lacunarity = 2, gain = 0.5) {
    let amp = 1;
    let freq = 1;
    let sum = 0;
    let norm = 0;
    for (let i = 0; i < octaves; i++) {
      sum += amp * this.get(x * freq + i * 17.3, y * freq - i * 9.1);
      norm += amp;
      amp *= gain;
      freq *= lacunarity;
    }
    return sum / norm;
  }
  // Ridged multifractal: sharp crests, good for mountain ranges. Returns 0..1
  ridged(x, y, octaves = 5) {
    let amp = 0.5;
    let freq = 1;
    let sum = 0;
    let prev = 1;
    let norm = 0;
    for (let i = 0; i < octaves; i++) {
      let n = 1 - Math.abs(this.get(x * freq + i * 31.7, y * freq + i * 11.3));
      n *= n;
      sum += n * amp * prev;
      norm += amp;
      prev = n;
      amp *= 0.5;
      freq *= 2.05;
    }
    return sum / norm;
  }
}
