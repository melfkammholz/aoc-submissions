export const range = (start: number, end: number, step: number = 1) =>
  [...Array(Math.ceil((end - start) / step))].map((_, i) => start + i * step);

export const clamp = (min: number, max: number, val: number) => Math.min(max, Math.max(val, min));