import { year } from './constants.js';
import { loadUsers } from './users.js';

window.addEventListener("load", async () => {
  const users = await loadUsers();
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

  function updateSolution() {
    loadSolution(users[state.index], state.day, state.part);
  }

  function setActive(selector, index) {
    const className = "active";
    const activatedEl = document.querySelectorAll(selector)[index];
    document.querySelectorAll(`${selector}.${className}`).forEach(el => el.classList.remove(className));
    activatedEl.classList.add(className);
  }

  function updateQueryParams() {
    const params = new URLSearchParams(window.location.search);
    for (const key in state) {
      params.set(key, state[key]);
    }
    history.pushState(null, "", `${window.location.pathname}?${params}`);
  }

  function updateState({ index = null, day = null, part = null, updateQuery = true }) {
    if (index !== null) {
      state.index = index;
      setActive("#users .list-group-item", index);
    }
    if (day !== null) {
      state.day = day;  
      setActive(".nav .day", day);
    }
    if (part !== null) {
      state.part = part;
      setActive(".part", part);
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
      loaded[key] = params.get(key);
    }
    updateState({ ...loaded, updateQuery: false });
  }

  const mod = (x, m) => (x % m + m) % m;

  window.addEventListener("keydown", (event) => {
    if (event.key === "w" || event.key === "k" ) updateState({ index: mod(state.index - 1, users.length) });
    else if (event.key === "s" || event.key === "j") updateState({ index: mod(state.index + 1, users.length) });
    else if (event.key === "a" || event.key === "h") updateState({ day: mod(state.day - 1, days) });
    else if (event.key === "d" || event.key === "l") updateState({ day: mod(state.day + 1, days) });
    else if (event.key === "q") updateState({ part: (state.part + 1) % 2 });
  });

  window.addEventListener("popstate", () => {
    loadStateFromQueryParams();
  });

  users.forEach((user, index) => {
    const el = render`
      <li class="list-group-item">
        <span class="user-name">${user.name}</span>
        <span class="user-lang-name">${user.langName}</span>
      </li>
    `;
    el.addEventListener("click", () => {
      updateState({ index });
    });
    document.getElementById("users").appendChild(el);
  });

  Array.from(document.querySelectorAll(".part")).forEach((el, i) => {
    el.addEventListener("click", () => {
      updateState({ part: i });
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
      updateState({ day: i });
    });
    el.appendChild(aEl);
    document.querySelector(".nav").appendChild(el);
  });

  loadStateFromQueryParams();
});

if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/themes/prism-tomorrow.min.css";
  document.querySelector("head").appendChild(link);
}

