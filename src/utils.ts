import { year } from "./constants";
import { User } from "./users";

type GitHubUrlsArgs = {
  user: string;
  repo: string;
  branch?: string;
  path: (day: number, part: number) => string;
};

export function gitHubUrls({ user, repo, branch = "main", path } : GitHubUrlsArgs): Pick<User, "solutionUrl" | "solutionWebUrl">  {
  return {
    solutionUrl: (day, part) => `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${path(day, part)}`,
    solutionWebUrl: (day, part) => `https://github.com/${user}/${repo}/blob/${branch}/${path(day, part)}`,
  };
}

/** Pads the given number with the given number of zeros. */
export function pad(n: any, zeros: number): string {
  return `${n}`.padStart(zeros, "0");
}

export const range = (start: number, end: number, step: number = 1) =>
  [...Array(Math.ceil((end - start) / step))].map((_, i) => start + i * step);

export const clamp = (min: number, max: number, val: number) => Math.min(max, Math.max(val, min));

export const currentDay = () => new Date(clamp(
  new Date(`${year}-12-01`).valueOf(),
  new Date(`${year}-12-25`).valueOf(),
  Date.now() - 6 * 60 * 60 * 1000
)).getDate();

export const mod = (x: number, m: number) => (x % m + m) % m;
