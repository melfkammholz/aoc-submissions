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

  function selectUserByIndex(index) {
    state.index = index;
    setActive("#users .list-group-item", index);
    updateSolution();
  }

  function selectDay(day) {
    state.day = day;  
    setActive(".nav .day", day);
    updateSolution();
  }

  function selectPart(part) {
    state.part = part;
    setActive(".part", part);
    updateSolution();
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

