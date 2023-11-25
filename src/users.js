import { year, shortYear } from './constants.js';
import { gitHubUrls, pad } from './utils.js';

/** Loads the list of users. */
export async function loadUsers() {
  // TODO handle error if necessary?
  const fwcdPaths = await (await fetch(`https://raw.githubusercontent.com/fwcd/advent-of-code-${year}/main/paths.json`)).json().catch(() => ({}));
  const estgPaths = await (await fetch(`https://raw.githubusercontent.com/estugon/advent-of-code-${year}/main/paths.json`)).json().catch(() => ({}));

  const users = [
    {
      name: "Alexander P",
      lang: _ => "clike",
      langName: "C++",
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
      langName: "C++",
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
      langName: "Lua",
      ...gitHubUrls({
        user: "melfkammholz",
        repo: `aoc${shortYear}`,
        path: (day, part) => `day${pad(day + 1, 2)}/${["A", "B"][part]}.lua`
      })
    },
    {
      name: "fwcd",
      lang: day => fwcdPaths[day]?.lang?.codemirror,
      langName: "Mixed",
      encoding: day => fwcdPaths[day]?.encoding,
      ...gitHubUrls({
        user: "fwcd",
        repo: `advent-of-code-${year}`,
        path: day => fwcdPaths[day]?.path
      })
    },
    {
      name: "xtay2",
      lang: _ => "java",
      langName: "Java",
      ...gitHubUrls({
        user: "xtay2",
        repo: "AdventOfCode",
        path: (day, part) => `src/year${year}/day${pad(day + 1, 2)}/Task_${["A", "B"][part]}.java`
      })
    },
    {
      name: "tuhhy",
      lang: _ => "python",
      langName: "Python",
      ...gitHubUrls({
        user: "tuhhy",
        repo: "aoc",
        branch: "master",
        path: (day, part) => `Day${day + 1}/Task${["A", "B"][part]}.py`
      })
    },
    {
      name: "Yorik Hansen",
      lang: _ => "python",
      langName: "Python",
      ...gitHubUrls({
        user: "YorikHansen",
        repo: "AdventOfCode",
        path: (day, part) => `${year}/day${pad(day + 1, 2)}/part${part + 1}.py`
      })
    },
    {
      name: "Skgland",
      lang: _ => "rust",
      langName: "Rust",
      ...gitHubUrls({
        user: "Skgland",
        repo: "Advent-of-Code",
        path: day => `year${year}/src/day${pad(day + 1, 2)}.rs`
      })
    },
    {
      name: "Estugon",
      lang: day => estgPaths[day]?.lang,
      langName: "Mixed",
      ...gitHubUrls({
        user: "Estugon",
        repo: `advent-of-code-${year}`,
        path: day => estgPaths[day]?.path
      })
    },
    {
      name: "Dormanil",
      lang: _ => "fsharp",
      langName: "F#",
      ...gitHubUrls({
        user: "Dormanil",
        repo: "Advent-of-Code",
        branch: `${year}`,
        path: day => `Dec${day + 1}/Program.fs`
      })
    },
    {
      name: "b3z",
      lang: _ => "python",
      langName: "Python",
      ...gitHubUrls({
        user: "b3z",
        repo: "aoc",
        branch: "master",
        path: (day, part) => `${year}/${pad(day + 1, 2)}/${part + 1}.py`
      })
    },
    {
      name: "Dobiko",
      lang: _ => "clike",
      langName: "C#",
      ...gitHubUrls({
        user: "jnccd",
        repo: "AdventOfCode",
        path: day => `Dec${day + 1}/Program.cs`
      })
    },
    {
      name: "H1tchhiker",
      lang: _ => "python",
      langName: "Python",
      ...gitHubUrls({
        user: "n00on",
        repo: "AdventOfCode",
        path: day => `${year}/${pad(day + 1, 2)}/day${pad(day + 1, 2)}.py`
      })
    },
    {
      name: "H1ghBre4k3r",
      lang: _ => "rust",
      langName: "Rust",
      ...gitHubUrls({
        user: "H1ghBre4k3r",
        repo: `aoc-${year}`,
        path: day => `src/day_${pad(day + 1, 2)}.rs`
      })
    },
    {
      name: "Zihark",
      lang: _ => "haskell",
      langName: "Haskell",
      ...gitHubUrls({
        user: "Ziharrk",
        repo: `aoc${year}`,
        path: day => `src/Day${day + 1}.hs`
      })
    },
    {
      name: "sebfisch",
      lang: _ => "java",
      langName: "Java",
      ...gitHubUrls({
        user: "sebfisch",
        repo: "AdventOfCode",
        branch: "latest",
        path: (day, part) => `year${year}/day${pad(day + 1, 2)}/Part${part + 1}.java`
      })
    },
    {
      name: "hendrick404",
      lang: _ => "python",
      langName: "Python",
      ...gitHubUrls({
        user: "hendrick404",
        repo: `advent-of-code-${year}`,
        path: day => `day${pad(day + 1, 2)}/day${pad(day + 1, 2)}.py`
      })
    },
    {
      name: "maclement",
      lang: _ => "haskell",
      langName: "Haskell",
      ...gitHubUrls({
        user: "maclement",
        repo: `advent-of-code-${year}`,
        path: day => `Haskell/Day${day + 1}/A.hs`
      })
    },
    {
      name: "Felioh",
      lang: _ => "python",
      langName: "Python",
      ...gitHubUrls({
        user: "Felioh",
        repo: "AdventOfCode",
        path: (day, part) => `${day + 1}/part${part + 1}.py`
      })
    }
  ];

  users.sort((a, b) => a.name.localeCompare(b.name));
  users.sort((a, b) => a.langName.localeCompare(b.langName));

  return users;
}
