window.addEventListener("load", async () => {
  const fwcdPathsResponse = await fetch('https://raw.githubusercontent.com/fwcd/advent-of-code-2021/main/paths.json');
  const fwcdPaths = JSON.parse(await fwcdPathsResponse.text());

  const users = [
    {
      name: "Alexander P",
      lang: _ => "clike",
      solutionUrl: (day, part) => {
        return `https://raw.githubusercontent.com/Zeldacrafter/CompProg-Solutions/master/AdventOfCode/2021/${day + 1}/${part + 1}.cc`
      }
    },
    {
      name: "I3J03RN",
      lang: _ => "clike",
      solutionUrl: (day, part) => {
        return `https://raw.githubusercontent.com/I3J03RN/ProgrammingChallenges/master/AoC/2021/${day + 1}.cc`
      }
    },
    {
      name: "Melf",
      lang: _ => "clike",
      solutionUrl: (day, part) => {
        const _day = (day + 1).toString().padStart(2, "0");
        const _part = ["A", "B"][part];
        return `https://raw.githubusercontent.com/melfkammholz/aoc21/main/day${_day}/${_part}.cc`
      }
    },
    {
      name: "Estugon",
      lang: _ => "clike",
      solutionUrl: (day, part) => {
        return `https://raw.githubusercontent.com/Estugon/Advent-Of-Code-2021/main/day${day + 1}/day${day + 1}.cpp`
      }
    },
    {
      name: "JulianGrabitzky",
      lang: _ => "clike",
      solutionUrl: (day, part) => {
        const _part = ["a", "b"][part];
        return `https://raw.githubusercontent.com/JulianGrabitzky/advent-of-code-2021/main/day/${day + 1}/${_part}.py`
      }
    },
    {
      name: "H1ghBre4k3r",
      lang: _ => "js",
      solutionUrl: (day, part) => {
        const _day = (day + 1).toString().padStart(2, "0");
        return `https://raw.githubusercontent.com/H1ghBre4k3r/advent-of-code-2021/main/day${_day}/solution0${part + 1}.js`
      }
    },
    {
      name: "l1k3ab0t",
      lang: _ => "rust",
      solutionUrl: (day, part) => {
        return `https://raw.githubusercontent.com/l1k3ab0t/aoc2021/main/src/day${day + 1}.rs`
      }
    },
    {
      name: "LeoVerto",
      lang: _ => "python",
      solutionUrl: (day, part) => {
        const _day = (day + 1).toString().padStart(2, "0");
        const _part = ["a", "b"][part];
        return `https://raw.githubusercontent.com/LeoVerto/advent-of-code-2021/main/days/${_day}/${_day}${_part}.py`
      }
    },
    {
      name: "Niatsuna",
      lang: _ => "python",
      solutionUrl: (day, part) => {
        const _day = (day + 1).toString().padStart(2, "0");
        return `https://raw.githubusercontent.com/Niatsuna/advent-of-code-2021/master/${_day}.py`
      }
    },
    {
      name: "mjt001",
      lang: _ => "python",
      solutionUrl: (day, part) => {
        const _day = (day + 1).toString().padStart(2, "0");
        return `https://raw.githubusercontent.com/mjt001/AdventofCode2021_mirror/main/${_day}/main${day + 1}${part + 1}.py`
      }
    },
    {
      name: "integermainvoid",
      lang: _ => "python",
      solutionUrl: (day, part) => {
        return `https://raw.githubusercontent.com/integermainvoid/advent_of_code/main/day%20${day + 1}/aoc_${part + 1}.py`
      }
    },
    {
      name: "fwcd",
      lang: day => day < fwcdPaths.length ? fwcdPaths[day].lang : null,
      solutionUrl: (day, part) =>
        day < fwcdPaths.length
          ? `https://raw.githubusercontent.com/fwcd/advent-of-code-2021/main/${fwcdPaths[day].path}`
          : null
    },
    {
      name: "maclement",
      lang: _ => "haskell",
      solutionUrl: (day, part) =>
      `https://raw.githubusercontent.com/maclement/advent-of-code-2021/main/Day${day + 1}/Day${day + 1}.hs`
    },
    {
      name: "xtay2",
      lang: _ => "java",
      solutionUrl: (day, part) => {
        const _day = (day + 1).toString().padStart(2, "0");
        return `https://raw.githubusercontent.com/xtay2/AdventOfCode/main/src/year2021/day${_day}/Task_${part == 0 ? 'A' : 'B'}.java`;
      }
    },
    {
      name: "Skgland",
      lang: _ => "rust",
      solutionUrl: (day, part) => {
        const _day = (day + 1).toString().padStart(2, "0");
        return `https://raw.githubusercontent.com/Skgland/Advent-of-Code/main/crates/year2021/src/day${_day}.rs`
      }
    }
  ];

  const days = new Date(Math.min(new Date("2021-12-25").valueOf(), Date.now())).getDate();
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
    try {
      const code = await fetch(url)
        .then(res => res.ok ? res.text() : Promise.reject(new Error("No solution yet!")));
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

  users.forEach((user, index) => {
    const el = document.createElement("li");
    el.classList.add("list-group-item");
    el.textContent = user.name;
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
