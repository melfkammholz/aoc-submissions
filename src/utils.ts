export const range = (start: number, end: number, step: number = 1) =>
  [...Array(Math.ceil((end - start) / step))].map((_, i) => start + i * step);

export const clamp = (min: number, max: number, val: number) => Math.min(max, Math.max(val, min));

export const currentDay = () => {
  const now = new Date();
  if (now.getHours() < 6) {
    return Math.max(1, now.getDate() - 1);
  } else {
    return Math.min(now.getDate(), 25)
  }
};

export const mod = (x: number, m: number) => (x % m + m) % m;
