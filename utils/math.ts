export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function roundTo(n: number, step: number) {
  return Math.round(n / step) * step;
}
