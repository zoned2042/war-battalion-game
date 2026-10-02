export const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);
export const lerp = (a, b, t) => a + (b - a) * t;
export const smoothstep = (e0, e1, x) => {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
};
export const dist = (ax, ay, bx, by) => Math.hypot(ax - bx, ay - by);

export function distToSegment(px, py, ax, ay, bx, by) {
  const dx = bx - ax;
  const dy = by - ay;
  const l2 = dx * dx + dy * dy;
  let t = l2 > 0 ? ((px - ax) * dx + (py - ay) * dy) / l2 : 0;
  t = clamp(t, 0, 1);
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

export function distToPolyline(px, py, pts) {
  let best = Infinity;
  for (let i = 0; i < pts.length - 1; i++) {
    const d = distToSegment(px, py, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1]);
    if (d < best) best = d;
  }
  return best;
}

export function pointInPoly(x, y, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0];
    const yi = poly[i][1];
    const xj = poly[j][0];
    const yj = poly[j][1];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

// Chaikin corner cutting. Keeps endpoints for open lines.
export function chaikin(pts, iterations = 2, closed = false) {
  let out = pts;
  for (let it = 0; it < iterations; it++) {
    const next = [];
    const n = out.length;
    if (n < 3) return out;
    if (!closed) next.push(out[0]);
    const limit = closed ? n : n - 1;
    for (let i = 0; i < limit; i++) {
      const a = out[i];
      const b = out[(i + 1) % n];
      next.push([a[0] * 0.75 + b[0] * 0.25, a[1] * 0.75 + b[1] * 0.25]);
      next.push([a[0] * 0.25 + b[0] * 0.75, a[1] * 0.25 + b[1] * 0.75]);
    }
    if (!closed) next.push(out[n - 1]);
    out = next;
  }
  return out;
}

// Resample a polyline at a fixed spacing.
export function resample(pts, step) {
  if (pts.length < 2) return pts.slice();
  const out = [pts[0]];
  let carry = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, ay] = pts[i];
    const [bx, by] = pts[i + 1];
    const len = Math.hypot(bx - ax, by - ay);
    let d = step - carry;
    while (d < len) {
      const t = d / len;
      out.push([ax + (bx - ax) * t, ay + (by - ay) * t]);
      d += step;
    }
    carry = len - (d - step);
  }
  const last = pts[pts.length - 1];
  const tail = out[out.length - 1];
  if (Math.hypot(last[0] - tail[0], last[1] - tail[1]) > step * 0.3) out.push(last);
  else out[out.length - 1] = last;
  return out;
}

export function segmentsIntersect(ax, ay, bx, by, cx, cy, dx, dy) {
  const d1 = (dx - cx) * (ay - cy) - (dy - cy) * (ax - cx);
  const d2 = (dx - cx) * (by - cy) - (dy - cy) * (bx - cx);
  const d3 = (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
  const d4 = (bx - ax) * (dy - ay) - (by - ay) * (dx - ax);
  return d1 * d2 < 0 && d3 * d4 < 0;
}

export function ordinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function formatNum(n) {
  return Math.round(n).toLocaleString('en-US');
}

export function pct(v) {
  return Math.round(clamp(v, 0, 1) * 100) + '%';
}

// Binary min-heap keyed by numeric priority.
export class MinHeap {
  constructor() {
    this.items = [];
    this.prios = [];
  }
  get size() {
    return this.items.length;
  }
  push(item, prio) {
    const it = this.items;
    const pr = this.prios;
    it.push(item);
    pr.push(prio);
    let i = it.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (pr[p] <= pr[i]) break;
      [it[p], it[i]] = [it[i], it[p]];
      [pr[p], pr[i]] = [pr[i], pr[p]];
      i = p;
    }
  }
  pop() {
    const it = this.items;
    const pr = this.prios;
    const top = it[0];
    const lastI = it.pop();
    const lastP = pr.pop();
    if (it.length > 0) {
      it[0] = lastI;
      pr[0] = lastP;
      let i = 0;
      const n = it.length;
      for (;;) {
        const l = 2 * i + 1;
        const r = l + 1;
        let m = i;
        if (l < n && pr[l] < pr[m]) m = l;
        if (r < n && pr[r] < pr[m]) m = r;
        if (m === i) break;
        [it[m], it[i]] = [it[i], it[m]];
        [pr[m], pr[i]] = [pr[i], pr[m]];
        i = m;
      }
    }
    return top;
  }
}
