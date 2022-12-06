window.addEventListener("load", async () => {
  const year = 2022;
  const shortYear = year % 100;

  const fwcdPaths = await (await fetch(`https://raw.githubusercontent.com/fwcd/advent-of-code-${year}/main/paths.json`)).json();
  const estgPaths = await (await fetch(`https://raw.githubusercontent.com/estugon/advent-of-code-${year}/main/paths.json`)).json();

  const users = [
    {
      name: "Alexander P",
      lang: _ => "clike",
      langName: "C++",
      solutionUrl: (day, part) => {
        return `https://raw.githubusercontent.com/Zeldacrafter/CompProg-Solutions/master/AdventOfCode/${year}/${day + 1}/${part + 1}.cc`
      }
    },
    {
      name: "I3J03RN",
      lang: _ => "clike",
      langName: "C++",
      solutionUrl: (day, part) => {
        return `https://raw.githubusercontent.com/I3J03RN/ProgrammingChallenges/master/AoC/${year}/${day + 1}.cc`
      }
    },
    {
      name: "Melf",
      lang: _ => "haskell",
      langName: "Haskell",
      solutionUrl: (day, part) => {
        const _day = (day + 1).toString().padStart(2, "0");
        const _part = ["A", "B"][part];
        return `https://raw.githubusercontent.com/melfkammholz/aoc${shortYear}/main/day${_day}/${_part}.hs`
      }
    },
    {
      name: "fwcd",
      lang: day => fwcdPaths[day]?.lang,
      langName: "Mixed",
      encoding: day => fwcdPaths[day]?.encoding,
      solutionUrl: (day, part) => {
        const path = fwcdPaths[day]?.path;
        return path ? `https://raw.githubusercontent.com/fwcd/advent-of-code-${year}/main/${path}` : null;
      }
    },
    {
      name: "xtay2",
      lang: _ => "java",
      langName: "Java",
      solutionUrl: (day, part) => {
        const _day = (day + 1).toString().padStart(2, "0");
        return `https://raw.githubusercontent.com/xtay2/AdventOfCode/main/src/year${year}/day${_day}/Task_${["A", "B"][part]}.java`
      }
    },
    {
      name: "tuhhy",
      lang: _ => "python",
      langName: "Python",
      solutionUrl: (day, part) => `https://raw.githubusercontent.com/tuhhy/aoc/master/Day${day + 1}/Task${["A", "B"][part]}.py`
    },
    {
      name: "Yorik Hansen",
      lang: _ => "python",
      langName: "Python",
      solutionUrl: (day, part) => {
        const _day = (day + 1).toString().padStart(2, "0");
        return `https://raw.githubusercontent.com/YorikHansen/AdventOfCode/main/${year}/day${_day}/part${part + 1}.py`
      }
    },
    {
      name: "Skgland",
      lang: _ => "rust",
      langName: "Rust",
      solutionUrl: (day, _part) => {
        const _day = (day + 1).toString().padStart(2, "0");
        return `https://raw.githubusercontent.com/Skgland/Advent-of-Code/main/year${year}/src/day${_day}.rs`
      }
    },
    {
      name: "Estugon",
      lang: day => estgPaths[day]?.lang,
      langName: "Mixed",
      solutionUrl: (day, part) => {
        const path = estgPaths[day]?.path;
        return path ? `https://raw.githubusercontent.com/estugon/advent-of-code-${year}/main/${path}` : null;
      }
    },
    {
      name: "Dormanil",
      lang: _ => "fsharp",
      langName: "F#",
      solutionUrl: (day, _part) => `https://raw.githubusercontent.com/Dormanil/Advent-of-Code/${year}/Dec${day + 1}/Program.fs`
    },
    {
      name: "b3z",
      lang: _ => "python",
      langName: "Python",
      solutionUrl: (day, part) => {
        const _day = (day + 1).toString().padStart(2, "0");
        return `https://raw.githubusercontent.com/b3z/aoc/master/${year}/${_day}/${part + 1}.py`
      }
    },
    {
      name: "Dobiko",
      lang: _ => "clike",
      langName: "C#",
      solutionUrl: (day, _part) => `https://raw.githubusercontent.com/jnccd/AdventOfCode/main/Dec${day + 1}/Program.cs`
    },
    {
      name: "H1tchhiker",
      lang: _ => "python",
      langName: "Python",
      solutionUrl: (day, part) => {
        const _day = (day + 1).toString().padStart(2, "0");
        return `https://raw.githubusercontent.com/n00on/AdventOfCode/main/${year}/${_day}/day${_day}.py`
      }
    },
    {
      name: "H1ghBre4k3r",
      lang: _ => "rust",
      langName: "Rust",
      solutionUrl: (day, _) => {
        const _day = (day + 1).toString().padStart(2, "0");
        return `https://raw.githubusercontent.com/H1ghBre4k3r/aoc-${year}/main/src/day_${_day}.rs`
      }
    },
    {
      name: "Zihark",
      lang: _ => "haskell",
      langName: "Haskell",
      solutionUrl: (day, part) =>
      `https://raw.githubusercontent.com/Ziharrk/aoc${year}/main/src/Day${day + 1}.hs`
    },
    {
      name: "sebfisch",
      lang: _ => "java",
      langName: "Java",
      solutionUrl: (day, part) => {
        const _day = (day + 1).toString().padStart(2, "0");
        return `https://raw.githubusercontent.com/sebfisch/AdventOfCode/latest/year${year}/day${_day}/Part${part+1}.java`
      }
    },
    {
      name: "hendrick404",
      lang: _ => "python",
      langName: "Python",
      solutionUrl: (day, _part) => {
        const _day = (day + 1).toString().padStart(2, "0");
        return `https://raw.githubusercontent.com/hendrick404/advent-of-code-${year}/main/day${_day}/day${_day}.py`;
      }
    },
    {
      name: "maclement",
      lang: _ => "haskell",
      langName: "Haskell",
      solutionUrl: (day, _part) =>
        `https://raw.githubusercontent.com/maclement/advent-of-code-${year}/main/Haskell/Day${day + 1}/A.hs`
    }
  ];

  const clamp = (min, max, val) => Math.min(max, Math.max(val, min));

  const days = new Date(clamp(new Date(`${year}-12-01`).valueOf(), new Date(`${year}-12-25`).valueOf(), Date.now())).getDate();
  const state = {
    day: days - 1,
    part: 0,
    index: 0
  };

  async function loadSolution(user, day, part) {
    const url = user.solutionUrl(day, part);
    const preEl = document.createElement("pre");
    const codeEl = document.createElement("code");
    const lang = user.lang(day);
    const encoding = ("encoding" in user ? user.encoding(day) : null) || "utf-8";
    const decoder = new TextDecoder(encoding);
    try {
      const result = url ? await fetch(url) : null;
      if (!(result?.ok ?? false)) {
        throw new Error("No solution yet");
      }
      const buffer = await result.arrayBuffer();
      const code = decoder.decode(buffer);
      await Prism.plugins.autoloader.loadLanguages(
        lang,
        () => {
          codeEl.innerHTML = Prism.highlight(code, Prism.languages[lang], user.lang);
        }
      );
    } catch (err) {
      codeEl.textContent = err.message;
    }
    preEl.appendChild(codeEl);
    document.getElementById("preview").innerHTML = "";
    document.getElementById("preview").appendChild(preEl);
  }

  function render(strings, ...values) {
    const html = String.raw({ raw: strings }, ...values);
    const el = document.createElement('div');
    el.innerHTML = html;
    return el.children[0];
  }

  users.forEach((user, index) => {
    const el = render`
      <li class="list-group-item">
        <span>${user.name}</span>
        <span>${user.langName}</span>
      </li>
    `;
    el.addEventListener("click", () => {
      state.index = index;
      document.querySelector(".list-group-item.active").classList.remove("active");
      el.classList.add("active");
      loadSolution(users[state.index], state.day, state.part);
    });
    document.getElementById("users").appendChild(el);
  });

  Array.from(document.querySelectorAll(".part")).forEach((el, i) => {
    el.addEventListener("click", () => {
      state.part = i;
      document.querySelector(".part.active").classList.remove("active");
      el.classList.add("active");
      loadSolution(users[state.index], state.day, state.part);
    });
  });

  [...Array(days)].forEach((_, i) => {
    const el = document.createElement("li");
    el.classList.add("nav-item");
    const aEl = document.createElement("a");
    aEl.classList.add("nav-link");
    aEl.classList.add("day");
    aEl.textContent = i + 1;
    aEl.addEventListener("click", () => {
      state.day = i;
      document.querySelector(".day.active").classList.remove("active");
      aEl.classList.add("active");
      loadSolution(users[state.index], state.day, state.part);
    });
    el.appendChild(aEl);
    document.querySelector(".nav").appendChild(el);
  });

  document.querySelectorAll(".list-group-item")[state.index].classList.add("active");
  document.querySelectorAll(".part")[state.part].classList.add("active");
  document.querySelectorAll(".day")[state.day].classList.add("active");

  loadSolution(users[state.index], state.day, state.part);
});

if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/themes/prism-tomorrow.min.css";
  document.querySelector("head").appendChild(link);
}

