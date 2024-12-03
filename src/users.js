import { year, shortYear } from './constants.js';
import { gitHubUrls, pad } from './utils.js';

/** Loads the list of users. */
export async function loadUsers() {
  // TODO handle error if necessary?
  const fwcdPaths = await (await fetch(`https://raw.githubusercontent.com/fwcd/advent-of-code-${year}/main/paths.json`)).json().catch(() => ({}));
  const kazumiPaths = await (await fetch(`https://raw.githubusercontent.com/Dormanil/Advent-of-Code/${year}/exceptionInfo.json`)).json().catch(() => ({}));
  const magi3rPaths = await (await fetch(`https://raw.githubusercontent.com/Magi3r/AoC-${year}/main/paths.json`)).json().catch(() => ({}));

  const fwcdSolution = (day, part) => (fwcdPaths[day]?.parts ?? [])[part] ?? fwcdPaths[day];
  const magi3rSolution = (day, part) => (magi3rPaths[day]?.parts ?? [])[part] ?? magi3rPaths[day];

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
      lang: _ => "scala",
      langName: _ => "Scala",
      ...gitHubUrls({
        user: "melfkammholz",
        repo: `aoc${shortYear}`,
        path: (day, part) => `day${pad(day + 1, 2)}/${["A", "B"][part]}.scala`
      })
    },
    {
      name: "fwcd",
      lang: (day, part) => fwcdSolution(day, part)?.lang?.codemirror,
      langAnnotation: "Today: ",
      langName: (day, part) => fwcdSolution(day, part)?.lang?.name ?? "Unknown",
      encoding: (day, part) => fwcdSolution(day, part)?.encoding,
      ...gitHubUrls({
        user: "fwcd",
        repo: `advent-of-code-${year}`,
        path: (day, part) => fwcdSolution(day, part)?.path
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
        path: day => `crates/year${year}/src/day${pad(day + 1, 2)}.rs`
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
      lang: (day, part) => magi3rSolution(day, part)?.lang?.codemirror,
      langAnnotation: "Today: ",
      langName: (day, part) => magi3rSolution(day, part)?.lang?.name ?? "Unknown",
      encoding: (day, part) => magi3rSolution(day, part)?.encoding,
      ...gitHubUrls({
        user: "Magi3r",
        repo: `AoC-${year}`,
        path: (day, part) => magi3rSolution(day, part)?.path
      })
    },
    {
      name: "sebfisch",
      lang: _ => "zig",
      langName: _ => "Zig",
      ...gitHubUrls({
        user: "sebfisch",
        repo: "AdventOfCode",
        branch: "latest",
        path: (day, part) => `year${year}/day${pad(day + 1, 2)}/task${part + 1}.zig`
      })
    },
    {
      name: "Kazumi",
      lang: day => kazumiPaths[`${day + 1}`]?.lang ?? "csharp",
      langAnnotation: "Today: ",
      langName: day => kazumiPaths[`${day + 1}`]?.langName ?? "C#",
      ...gitHubUrls({
        user: "Dormanil",
        repo: "Advent-of-Code",
        branch: `${year}`,
        path: day => `Dec${day + 1}/Program.${kazumiPaths[`${day + 1}`]?.extension ?? "cs"}`
      })
    },
    {
      name: "Sesquil",
      lang: _ => "python",
      langName: _ => "Python",
      ...gitHubUrls({
        user: "sesquil",
        repo: `aoc${shortYear}`,
        path: (day, part) => `day${pad(day + 1, 2)}/part_${part + 1}.py`
      })
    },
    {
      name: "palisn",
      lang: _ => "racket",
      langName: _ => "Racket",
      ...gitHubUrls({
        user: "palisn",
        repo: "advent-of-code",
        path: (day, part) => `${year}/day${pad(day + 1, 2)}/puzzle${part + 1}.rkt`
      })
    },
    {
      name: "xtay2",
      lang: _ => "java",
      langName: _ => "Java",
      ...gitHubUrls({
        user: "xtay2",
        repo: "AdventOfCode",
        path: (day, part) => `src/year${year}/day${pad(day + 1, 2)}/Task_${["A", "B"][part]}.java`
      })
    },
    {
      name: "JaGitJe",
      lang: _ => "haskell",
      langName: _ => "Haskell",
      ...gitHubUrls({
        user: "JaGitJe",
        repo: `adventofcode${shortYear}`,
        path: (day, part) => `src/Day${pad(day + 1, 2)}.hs`
      })
    },
    {
      name: "CoolCode2020",
      lang: _ => "python",
      langName: _ => "Python",
      ...gitHubUrls({
        user: "CoolCode2020",
        repo: "AOC",
        path: (day, part) => `/Tag${day + 1}/day${day + 1}.py`
      })
    },
    {
      name: "hype09",
      lang: _ => "fsharp",
      langName: _ => "F#",
      ...gitHubUrls({
        user: "hype09",
        repo: "aoc2024",
        branch: "master",
        path: (day, part) => `Day${pad(day + 1, 2)}/Part${pad(part + 1, 2)}.fs`
      })
    },
    {
      name: "UnDosTres",
      lang: _ => "python",
      langName: _ => "Python",
      ...gitHubUrls({
        user: "donmahallem",
        repo: `aoc${shortYear}`,
        path: (day, part) => `${pad(day + 1, 2)}/part_${part + 1}.py`
      })
    },
    {
      name: "Morsie (Hannes)",
      lang: _ => "python",
      langName: _ => "Python",
      ...gitHubUrls({
        user: "hnnsb",
        repo: `AdventOfCode${year}`,
        path: (day, part) => `${pad(day + 1, 2)}.py`
      })
    },
    {
      name: "Hendrik",
      lang: _ => "python",
      langName: _ => "Python",
      ...gitHubUrls({
        user: "hendrick404",
        repo: "advent-of-code-2024",
        branch: "main",
        path: (day, part) => `day${pad(day + 1, 2)}/part${pad(part + 1, 2)}.py`
      })
    },
    {
      name: "Roman",
      lang: _ => "python",
      langName: _ => "Python",
      ...gitHubUrls({
        user: "romanhemens",
        repo: `advent_of_code2024`,
        path: (day, part) => `Day${day + 1}/${part === 1 ? "first" : "second"}.py`
      })
    }
  ];

  if (new Set(users.map(u => u.name)).size != users.length) {
    throw new Error("Users must have unique names!")
  }

  return users;
}
