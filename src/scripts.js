import { year } from './constants.js';
import { loadUsers } from './users.js';

window.addEventListener("load", async () => {
  const users = await loadUsers();
  const clamp = (min, max, val) => Math.min(max, Math.max(val, min));

  const days = new Date(clamp(new Date(`${year}-12-01`).valueOf(), new Date(`${year}-12-25`).valueOf(), Date.now() - 6 * 60 * 60 * 1000)).getDate();
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

  function currentUser() {
    return users[state.index];
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
    const params = new URLSearchParams(window.location.search);
    for (const key in state) {
      params.set(key, `${state[key]}`);
    }
    history.pushState(null, "", `${window.location.pathname}?${params}`);
  }

  function updateState({ index = null, day = null, part = null, updateActive = false, updateQuery = true }) {
    state.index = index ?? state.index;
    state.day = day ?? state.day;
    state.part = part ?? state.part;
    if (index !== null || updateActive) {
      setActive("#users .list-group-item", state.index);
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
        loaded[key] = parseInt(value);
      }
    }
    updateState({ ...loaded, updateActive: true, updateQuery: false });
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

  function createNavItem({ label = "", classes = [], onClick = () => {} }) {
    const el = document.createElement("li");
    el.classList.add("nav-item");
    const aEl = document.createElement("a");
    aEl.classList.add("nav-link");
    for (const cl of classes) {
      aEl.classList.add(cl);
    }
    aEl.textContent = label;
    aEl.addEventListener("click", onClick);
    el.appendChild(aEl);
    return el;
  }

  const navEl = document.querySelector(".nav");

  [...Array(days)].forEach((_, day) => {
    navEl.appendChild(createNavItem({ label: `${day + 1}`, classes: ["day"], onClick: () => {
      updateState({ day });
    }}));
  });

  navEl.appendChild(createNavItem({ label: "View Source", classes: ["text-white"], onClick: () => {
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

