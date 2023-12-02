import { year, shortYear } from './constants.js';
import { gitHubUrls, pad } from './utils.js';

/** Loads the list of users. */
export async function loadUsers() {
  // TODO handle error if necessary?
  const fwcdPaths = await (await fetch(`https://raw.githubusercontent.com/fwcd/advent-of-code-${year}/main/paths.json`)).json().catch(() => ({}));

  const users = [
    {
      name: "Alexander P",
      lang: _ => "clike",
      langName: _ => "C++",
      ...gitHubUrls({
        user: "Zeldacrafter",
        repo: "CompProg-Solutions",
        branch: "master",
        path: (day, part) => `AdventOfCode/${year}/${day + 1}/${part + 1}.cc`
      })
    },
    {
      name: "I3J03RN",
      lang: _ => "clike",
      langName: _ => "C++",
      ...gitHubUrls({
        user: "I3J03RN",
        repo: "ProgrammingChallenges",
        branch: "master",
        path: day => `AoC/${year}/${day + 1}.cc`
      })
    },
    {
      name: "Melf",
      lang: _ => "lua",
      langName: _ => "Lua",
      ...gitHubUrls({
        user: "melfkammholz",
        repo: `aoc${shortYear}`,
        path: (day, part) => `day${pad(day + 1, 2)}/${["A", "B"][part]}.lua`
      })
    },
    {
      name: "fwcd",
      lang: day => fwcdPaths[day]?.lang?.codemirror,
      langAnnotation: "Today: ",
      langName: day => fwcdPaths[day]?.lang?.name ?? "Unknown",
      encoding: day => fwcdPaths[day]?.encoding,
      ...gitHubUrls({
        user: "fwcd",
        repo: `advent-of-code-${year}`,
        path: day => fwcdPaths[day]?.path
      })
    },
    {
      name: "Yorik Hansen",
      lang: _ => "python",
      langName: _ => "Python",
      ...gitHubUrls({
        user: "YorikHansen",
        repo: "AdventOfCode",
        path: (day, part) => `${year}/day${pad(day + 1, 2)}/part${part + 1}.py`
      })
    },
    {
      name: "Skgland",
      lang: _ => "rust",
      langName: _ => "Rust",
      ...gitHubUrls({
        user: "Skgland",
        repo: "Advent-of-Code",
        path: day => `year${year}/src/day${pad(day + 1, 2)}.rs`
      })
    },
    {
      name: "b3z",
      lang: _ => "python",
      langName: _ => "Python",
      ...gitHubUrls({
        user: "b3z",
        repo: "aoc",
        branch: "master",
        path: (day, part) => `${year}/${pad(day + 1, 2)}/${part + 1}.py`
      })
    },
    {
      name: "H1tchhiker",
      lang: _ => "elixir",
      langName: _ => "Elixir",
      ...gitHubUrls({
        user: "n00on",
        repo: "AdventOfCode",
        path: day => `${year}/${pad(day + 1, 2)}/day${pad(day + 1, 2)}.ex`
      })
    },
    {
      name: "H1ghBre4k3r",
      lang: _ => "rust",
      langName: _ => "Rust",
      ...gitHubUrls({
        user: "H1ghBre4k3r",
        repo: `aoc-${year}`,
        path: day => `src/day_${pad(day + 1, 2)}.rs`
      })
    },
    {
      name: "Zihark",
      lang: _ => "haskell",
      langName: _ => "Haskell",
      ...gitHubUrls({
        user: "Ziharrk",
        repo: `aoc${year}`,
        path: day => `src/Day${day + 1}.hs`
      })
    },
    {
      name: "maclement",
      lang: _ => "haskell",
      langName: _ => "Haskell",
      ...gitHubUrls({
        user: "maclement",
        repo: `advent-of-code-${year}`,
        path: day => `Haskell/Day${day + 1}/A.hs`
      })
    },
    {
      name: "Magi3r",
      lang: _ => "esolang",
      langName: _ => "DDP",
      ...gitHubUrls({
        user: "Magi3r",
        repo: `AoC-${year}`,
        path: (day, part) => `${pad(day + 1, 2)}${["a", "b"][part]}.ddp`
      })
    },
  ];

  if (new Set(users.map(u => u.name)).size != users.length) {
    throw new Error("Users must have unique names!")
  }

  return users;
}
