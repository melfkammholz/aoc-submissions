import { year } from './constants.js';
import { loadUsers } from './users.js';

window.addEventListener("load", async () => {
  const mod = (x, m) => (x % m + m) % m;
  const clamp = (min, max, val) => Math.min(max, Math.max(val, min));
  
  const minBy = (xs, p) => xs.reduce((y, x) => p(y, x) < 0 ? y : x, xs[0]);
  const comps = (...ps) => (a, b) => ps.reduce((r, p) => r == 0 ? p(a, b) : r, 0);
  const userComp = (day, part) => comps(
    (a, b) => a.langName(day, part).localeCompare(b.langName(day, part)),
    (a, b) => a.name.localeCompare(b.name)
  );

  const users = await loadUsers();

  const days = new Date(clamp(
      new Date(`${year}-12-01`).valueOf(), 
      new Date(`${year}-12-12`).valueOf(), 
      Date.now() - 6 * 60 * 60 * 1000
    )).getDate();
  
  const state = {
    day: days - 1,
    part: 0,
    userName: minBy(users, userComp(days - 1, 0)).name,
  };

  async function loadSolution(user, day, part) {
    const url = user.solutionUrl(day, part);
    const preEl = document.createElement("pre");
    const codeEl = document.createElement("code");
    const lang = user.lang(day, part);
    const encoding = ("encoding" in user ? user.encoding(day, part) : null) || "utf-8";
    const decoder = new TextDecoder(encoding);
    try {
      const result = url ? await fetch(url) : null;
      if (!(result?.ok ?? false)) {
        throw new Error("No solution yet");
      }
      const buffer = await result.arrayBuffer();
      const code = decoder.decode(buffer);
      if (lang) {
        await Prism.plugins.autoloader.loadLanguages(
          lang,
          () => {
            codeEl.innerHTML = Prism.highlight(code, Prism.languages[lang], user.lang);
          },
          () => {
            codeEl.innerText = code;
          }
        );
      } else {
        codeEl.innerText = code;
      }
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

  function userIndex(userName) {
    const index = users.findIndex(u => u.name === userName);
    if (index < 0) {
      throw new Error(`Could not find index for user ${userName}`);
    }
    return index;
  }

  function currentUser() {
    return state.userName ? users.find(u => u.name === state.userName) : null;
  }

  function updateSolution() {
    loadSolution(currentUser(), state.day, state.part);
  }

  function setActive(selector, index) {
    const className = "active";
    const activatedEl = document.querySelectorAll(selector)[index];
    document.querySelectorAll(`${selector}.${className}`).forEach(el => el.classList.remove(className));
    activatedEl.classList.add(className);
  }

  function updateQueryParams() {
    const params = new URLSearchParams();
    for (const key in state) {
      params.set(key, `${state[key]}`);
    }
    history.pushState(null, "", `${window.location.pathname}?${params}`);
  }

  function updateUsers() {
    const usersEl = document.getElementById("users");
    usersEl.innerHTML = "";

    users.sort(userComp(state.day, state.part));

    users.forEach(user => {
      const el = render`
        <li class="list-group-item">
          <span class="user-name">${user.name}</span>
          <span class="user-lang">
            ${user.langAnnotation ? `<span class="user-lang-annotation">${user.langAnnotation}</span>` : ""}
            <span class="user-lang-name">${user.langName(state.day, state.part)}</span>
          </span>
        </li>
      `;
      el.addEventListener("click", () => {
        updateState({ userName: user.name });
      });
      usersEl.appendChild(el);
    });
  }

  function updateState({ userName = null, day = null, part = null, updateActive = false, updateQuery = true }) {
    if (userName !== null && !users.find(u => u.name === userName)) {
      console.warn(`User ${userName} could not be found!`);
      userName = null;
    }

    state.day = day ?? state.day;
    state.part = part ?? state.part;
    state.userName = userName ?? (updateQuery ? state.userName : minBy(users, userComp(state.day, state.part)).name);

    if (day !== null || part !== null || updateActive) {
      updateUsers();
    }
    if (userName !== null || day !== null || part !== null || updateActive) {
      setActive("#users .list-group-item", userIndex(state.userName));
    }
    if (day !== null || updateActive) {
      setActive(".nav .day", state.day);
    }
    if (part !== null || updateActive) {
      setActive(".part", state.part);
    }
    if (updateQuery) {
      updateQueryParams();
    }
    updateSolution();
  }

  function loadStateFromQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const loaded = {};
    for (const key in state) {
      const value = params.get(key);
      if (value !== null) {
        const parsed = parseInt(value);
        loaded[key] = isNaN(parsed) ? value : parsed;
      }
    }
    updateState({ ...loaded, updateActive: true, updateQuery: false });
  }

  function userNameWithOffset(userName, offset) {
    return users[mod(userIndex(userName) + offset, users.length)].name;
  }

  window.addEventListener("keydown", (event) => {
    if (event.key === "w" || event.key === "k" ) updateState({ userName: userNameWithOffset(state.userName, -1) });
    else if (event.key === "s" || event.key === "j") updateState({ userName: userNameWithOffset(state.userName, 1) });
    else if (event.key === "a" || event.key === "h") updateState({ day: mod(state.day - 1, days) });
    else if (event.key === "d" || event.key === "l") updateState({ day: mod(state.day + 1, days) });
    else if (event.key === "q") updateState({ part: (state.part + 1) % 2 });

    // scroll when keyboard shortcuts are used for navigation
    if (["w", "s", "k", "j"].indexOf(event.key) !== -1) {
      const li = document.querySelector("#users .list-group-item.active");
      li.parentElement.scrollTop = 
        li.offsetTop - 0.5 * (li.parentElement.offsetHeight - li.offsetHeight);
    }
  });

  window.addEventListener("popstate", () => {
    loadStateFromQueryParams();
  });

  Array.from(document.querySelectorAll(".part")).forEach((el, i) => {
    el.addEventListener("click", () => {
      updateState({ part: i });
    });
  });

  function createNavItem({ label = "", classes = [], onClick = () => {} }) {
    const el = render`<li class="nav-item" />`;
    const aEl = render`<a class="nav-link ${classes.join(" ")}">${label}</a>`;
    aEl.addEventListener("click", onClick);
    el.appendChild(aEl);
    return el;
  }

  const navEl = document.querySelector(".nav");

  [...Array(days)].forEach((_, day) => {
    navEl.appendChild(createNavItem({ label: `${day + 1}`, classes: ["day"], onClick: (event) => {
      if (event.ctrlKey || event.metaKey) {
        location.href = "https://adventofcode.com/2025/day/" + (day + 1);
      } else {
        updateState({ day });
      }
    }}));
  });

  navEl.appendChild(createNavItem({ label: "View Source", onClick: () => {
    const webUrl = currentUser().solutionWebUrl(state.day, state.part);
    if (webUrl) {
      window.location.href = webUrl;
    } else {
      alert("No web URL is available for this solution!");
    }
  }}));

  loadStateFromQueryParams();
});

if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/themes/prism-tomorrow.min.css";
  document.querySelector("head").appendChild(link);
}

