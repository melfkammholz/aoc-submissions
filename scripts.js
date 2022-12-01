window.addEventListener("load", async () => {
  const fwcdPathsResponse = await fetch('https://raw.githubusercontent.com/fwcd/advent-of-code-2022/main/paths.json');
  const fwcdPaths = JSON.parse(await fwcdPathsResponse.text());

  const users = [
    {
      name: "Alexander P",
      lang: _ => "clike",
      solutionUrl: (day, part) => {
        return `https://raw.githubusercontent.com/Zeldacrafter/CompProg-Solutions/master/AdventOfCode/2022/${day + 1}/${part + 1}.cc`
      }
    },
    {
      name: "I3J03RN",
      lang: _ => "clike",
      solutionUrl: (day, part) => {
        return `https://raw.githubusercontent.com/I3J03RN/ProgrammingChallenges/master/AoC/2022/${day + 1}.cc`
      }
    },
    {
      name: "Melf",
      lang: _ => "haskell",
      solutionUrl: (day, part) => {
        const _day = (day + 1).toString().padStart(2, "0");
        const _part = ["A", "B"][part];
        return `https://raw.githubusercontent.com/melfkammholz/aoc22/main/day${_day}/${_part}.hs`
      }
    },
    {
      name: "fwcd",
      lang: day => day < fwcdPaths.length ? fwcdPaths[day].lang : null,
      solutionUrl: (day, part) =>
        day < fwcdPaths.length
          ? `https://raw.githubusercontent.com/fwcd/advent-of-code-2022/main/${fwcdPaths[day].path}`
          : null
    },
    {
      name: "xtay2",
      lang: _ => "java",
      solutionUrl: (day, part) => {
        const _day = (day + 1).toString().padStart(2, "0");
        return `https://raw.githubusercontent.com/xtay2/AdventOfCode/main/src/year2022/day${_day}/Task_${["A", "B"][part]}.java`
      }
    },
    {
      name: "tuhhy",
      lang: _ => "python",
      solutionUrl: (day, part) => `https://raw.githubusercontent.com/tuhhy/aoc/master/Day${day+1}/Task${["A", "B"][part]}.py`
    },
    {
      name: "Yorik Hansen",
      lang: _ => "python",
      solutionUrl: (day, part) => {
        const _day = (day + 1).toString().padStart(2, "0");
        return `https://raw.githubusercontent.com/YorikHansen/AdventOfCode/main/2022/day{_day}/part${part + 1}.py`
      }
    }
  ];

  const clamp = (min, max, val) => Math.min(max, Math.max(val, min));

  const days = new Date(clamp(new Date("2022-12-01").valueOf(), new Date("2022-12-25").valueOf(), Date.now())).getDate();
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
