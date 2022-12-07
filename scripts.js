/** Generates solution urls for GitHub. */
function gitHubUrls({ user, repo, branch = "main", path }) {
  return {
    solutionUrl: (day, part) => `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${path(day, part)}`,
    solutionWebUrl: (day, part) => `https://github.com/${user}/${repo}/blob/${branch}/${path(day, part)}`,
  };
}

/** Pads the given number with the given number of zeros. */
function pad(n, zeros) {
  return `${n}`.padStart(zeros, "0");
}

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
      lang: _ => "haskell",
      langName: "Haskell",
      ...gitHubUrls({
        user: "melfkammholz",
        repo: `aoc${shortYear}`,
        path: (day, part) => `day${pad(day + 1, 2)}/${["A", "B"][part]}.hs`
      })
    },
    {
      name: "fwcd",
      lang: day => fwcdPaths[day]?.lang,
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
        path: day => `src/day_${pad(day + 1, 2).rs}`
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

  function selectUserByIndex(index) {
      state.index = index;
      const el = document.querySelector(`#users .list-group-item:nth-of-type(${index + 1})`);
      document.querySelector(".list-group-item.active").classList.remove("active");
      el.classList.add("active");
      loadSolution(users[state.index], state.day, state.part);
  }

  function selectDay(day) {
      state.day = day;  
      const el = document.querySelectorAll(`.nav .day`)[day];
      document.querySelector(".day.active").classList.remove("active");
      el.classList.add("active");
      loadSolution(users[state.index], state.day, state.part);
  }

  function selectPart(part) {
      state.part = part;
      const el = document.querySelector(".part:not(.active)");
      document.querySelector(".part.active").classList.remove("active");
      el.classList.add("active");
      loadSolution(users[state.index], state.day, state.part);
  }

  const mod = (x, m) => (x % m + m) % m;

  window.addEventListener("keydown", (event) => {
    if (event.key === "w" || event.key === "k" ) selectUserByIndex(mod(state.index - 1, users.length));
    else if (event.key === "s" || event.key === "j") selectUserByIndex(mod(state.index + 1, users.length));
    else if (event.key === "a" || event.key === "h") selectDay(mod(state.day - 1, days));
    else if (event.key === "d" || event.key === "l") selectDay(mod(state.day + 1, days));
    else if (event.key === "q") selectPart((state.part + 1) % 2);
  });

  users.forEach((user, index) => {
    const el = render`
      <li class="list-group-item">
        <span class="user-name">${user.name}</span>
        <span class="user-lang-name">${user.langName}</span>
      </li>
    `;
    el.addEventListener("click", () => {
      selectUserByIndex(index);
    });
    document.getElementById("users").appendChild(el);
  });

  Array.from(document.querySelectorAll(".part")).forEach((el, i) => {
    el.addEventListener("click", () => {
      selectPart(i);
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
      selectDay(i);
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

