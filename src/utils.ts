import { year } from "./constants";

export const range = (start: number, end: number, step: number = 1) =>
  [...Array(Math.ceil((end - start) / step))].map((_, i) => start + i * step);

export const clamp = (min: number, max: number, val: number) => Math.min(max, Math.max(val, min));

export const currentDay = () => new Date(clamp(
  new Date(`${year}-12-01`).valueOf(),
  new Date(`${year}-12-25`).valueOf(),
  Date.now() - 6 * 60 * 60 * 1000
)).getDate();

export const mod = (x: number, m: number) => (x % m + m) % m;
