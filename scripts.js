/** Generates solution urls for GitHub. */
function gitHubUrls({user, repo, branch = (year => "main"), path}) {
	return {
		solutionUrl: (year, day, part) => `https://raw.githubusercontent.com/${user}/${repo(year)}/${branch(year)}/${path(year, day, part)}`,
		solutionWebUrl: (year, day, part) => `https://github.com/${user}/${repo(year)}/blob/${branch(year)}/${path(year, day, part)}`,
	};
}

/** Pads the given number with the given number of zeros. */
function pad(n, zeros) {
	return `${n}`.padStart(zeros, "0");
}

window.addEventListener("load", async () => {

	const fwcdPaths = async year => {
		return await (await fetch(`https://raw.githubusercontent.com/fwcd/advent-of-code-${year}/main/paths.json`)).json();
	}
	const estgPaths = async year => {
		return await (await fetch(`https://raw.githubusercontent.com/estugon/advent-of-code-${year}/main/paths.json`)).json();
	}

	const users = [
		{
			name: "Alexander P",
			lang: _ => "clike",
			langName: "C++",
			...gitHubUrls({
				user: "Zeldacrafter",
				repo: _ => "CompProg-Solutions",
				branch: _ => "master",
				path: (year, day, part) => `AdventOfCode/${year}/${day + 1}/${part + 1}.cc`
			})
		},
		{
			name: "I3J03RN",
			lang: _ => "clike",
			langName: "C++",
			...gitHubUrls({
				user: "I3J03RN",
				repo: _ => "ProgrammingChallenges",
				branch: _ => "master",
				path: (year, day, part) => `AoC/${year}/${day + 1}.cc`
			})
		},
		{
			name: "Melf",
			lang: _ => "haskell",
			langName: "Haskell",
			...gitHubUrls({
				user: "melfkammholz",
				repo: year => `aoc${year % 100}`,
				path: (year, day, part) => `day${pad(day + 1, 2)}/${["A", "B"][part]}.hs`
			})
		},
		{
			name: "fwcd",
			lang: day => fwcdPaths[day]?.lang,
			langName: "Mixed",
			encoding: day => fwcdPaths[day]?.encoding,
			...gitHubUrls({
				user: "fwcd",
				repo: year => `advent-of-code-${year}`,
				path: (year, day, part) => fwcdPaths[day]?.path
			})
		},
		{
			name: "xtay2",
			lang: _ => "java",
			langName: "Java",
			...gitHubUrls({
				user: "xtay2",
				repo: _ => "AdventOfCode",
				path: (year, day, part) => `src/year${year}/day${pad(day + 1, 2)}/Task_${["A", "B"][part]}.java`
			})
		},
		{
			name: "tuhhy",
			lang: _ => "python",
			langName: "Python",
			...gitHubUrls({
				user: "tuhhy",
				repo: _ => "aoc",
				branch: _ => "master",
				path: (year, day, part) => `Day${day + 1}/Task${["A", "B"][part]}.py`
			})
		},
		{
			name: "Yorik Hansen",
			lang: _ => "python",
			langName: "Python",
			...gitHubUrls({
				user: "YorikHansen",
				repo: _ => "AdventOfCode",
				path: (year, day, part) => `${year}/day${pad(day + 1, 2)}/part${part + 1}.py`
			})
		},
		{
			name: "Skgland",
			lang: _ => "rust",
			langName: "Rust",
			...gitHubUrls({
				user: "Skgland",
				repo: _ => "Advent-of-Code",
				path: (year, day, part) => `year${year}/src/day${pad(day + 1, 2)}.rs`
			})
		},
		{
			name: "Estugon",
			lang: day => estgPaths[day]?.lang,
			langName: "Mixed",
			...gitHubUrls({
				user: "Estugon",
				repo: year => `advent-of-code-${year}`,
				path: (year, day, part) => estgPaths[day]?.path
			})
		},
		{
			name: "Dormanil",
			lang: _ => "fsharp",
			langName: "F#",
			...gitHubUrls({
				user: "Dormanil",
				repo: _ => "Advent-of-Code",
				branch: year => `${year}`,
				path: (year, day, part) => `Dec${day + 1}/Program.fs`
			})
		},
		{
			name: "b3z",
			lang: _ => "python",
			langName: "Python",
			...gitHubUrls({
				user: "b3z",
				repo: _ => "aoc",
				branch: _ => "master",
				path: (year, day, part) => `${year}/${pad(day + 1, 2)}/${part + 1}.py`
			})
		},
		{
			name: "Dobiko",
			lang: _ => "clike",
			langName: "C#",
			...gitHubUrls({
				user: "jnccd",
				repo: _ => "AdventOfCode",
				path: (year, day, part) => `Dec${day + 1}/Program.cs`
			})
		},
		{
			name: "H1tchhiker",
			lang: _ => "python",
			langName: "Python",
			...gitHubUrls({
				user: "n00on",
				repo: _ => "AdventOfCode",
				path: (year, day, part) => `${year}/${pad(day + 1, 2)}/day${pad(day + 1, 2)}.py`
			})
		},
		{
			name: "H1ghBre4k3r",
			lang: _ => "rust",
			langName: "Rust",
			...gitHubUrls({
				user: "H1ghBre4k3r",
				repo: year => `aoc-${year}`,
				path: (year, day, part) => `src/day_${pad(day + 1, 2).rs}`
			})
		},
		{
			name: "Zihark",
			lang: _ => "haskell",
			langName: "Haskell",
			...gitHubUrls({
				user: "Ziharrk",
				repo: year => `aoc${year}`,
				path: (year, day, part) => `src/Day${day + 1}.hs`
			})
		},
		{
			name: "sebfisch",
			lang: _ => "java",
			langName: "Java",
			...gitHubUrls({
				user: "sebfisch",
				repo: _ => "AdventOfCode",
				branch: _ => "latest",
				path: (year, day, part) => `year${year}/day${pad(day + 1, 2)}/Part${part + 1}.java`
			})
		},
		{
			name: "hendrick404",
			lang: _ => "python",
			langName: "Python",
			...gitHubUrls({
				user: "hendrick404",
				repo: year => `advent-of-code-${year}`,
				path: (year, day, part) => `day${pad(day + 1, 2)}/day${pad(day + 1, 2)}.py`
			})
		},
		{
			name: "maclement",
			lang: _ => "haskell",
			langName: "Haskell",
			...gitHubUrls({
				user: "maclement",
				repo: year => `advent-of-code-${year}`,
				path: (year, day, part) => `Haskell/Day${day + 1}/A.hs`
			})
		},
		{
			name: "Felioh",
			lang: _ => "python",
			langName: "Python",
			...gitHubUrls({
				user: "Felioh",
				repo: _ => "AdventOfCode",
				path: (year, day, part) => `${day + 1}/part${part + 1}.py`
			})
		}
	];

	users.sort((a, b) => a.name.localeCompare(b.name));
	//users.sort((a, b) => a.langName.localeCompare(b.langName));

	const currentYear = new Date().getFullYear();
	const state = {
		day: new Date(Date.now()).getDate() - 1,
		part: 0,
		year: currentYear,
		index: 0
	};

	async function loadSolution(user, year, day, part) {
		const url = user.solutionUrl(year, day, part);
		const preEl = document.createElement("pre");
		const codeEl = document.createElement("code");
		const lang = user.lang(year, day);
		const encoding = ("encoding" in user ? user.encoding(day) : null) || "utf-8";
		const decoder = new TextDecoder(encoding);
		try {
			const result = url ? await fetch(url) : null;
			if (!result.ok)
				throw new Error("No solution yet");
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

	function maxDay(selYear) {
		return selYear < currentYear ? 25 : Math.min(new Date(Date.now()).getDate(), 25);
	}

	function render(strings, ...values) {
		const html = String.raw({raw: strings}, ...values);
		const el = document.createElement('div');
		el.innerHTML = html;
		return el.children[0];
	}

	function selectUserByIndex(index) {
		document.querySelector(`#users .list-group-item:nth-of-type(${index + 1})`).click();
	}

	function selectYear(year) {
		document.querySelectorAll(`.nav .year`)[year].click()
	}

	function selectDay(day) {
		document.querySelectorAll(`.nav .day`)[day].click();
	}

	function selectPart(part) {
		state.part = part;
		const el = document.querySelector(".part:not(.active)");
		document.querySelector(".part.active").classList.remove("active");
		el.classList.add("active");
		loadSolution(users[state.index], state.year, state.day, state.part);
	}

	const mod = (x, m) => (x % m + m) % m;

	window.addEventListener("keydown", (event) => {
		if (event.key === "w") selectUserByIndex(mod(state.index - 1, users.length));
		else if (event.key === "s" || event.key === "j") selectUserByIndex(mod(state.index + 1, users.length));
		else if (event.key === "A" || event.key === "H") selectYear(mod(state.year - 1 - 2015, currentYear - 2014));
		else if (event.key === "D" || event.key === "L") selectYear(mod(state.year + 1 - 2015, currentYear - 2014));
		else if (event.key === "a" || event.key === "h") selectDay(mod(state.day - 1, maxDay(state.year)));
		else if (event.key === "d" || event.key === "l") selectDay(mod(state.day + 1, maxDay(state.year)));
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
			state.index = index;
			document.querySelector(".list-group-item.active").classList.remove("active");
			el.classList.add("active");
			loadSolution(users[state.index], state.year, state.day, state.part);
		});
		document.getElementById("users").appendChild(el);
	});

	Array.from(document.querySelectorAll(".part")).forEach((el, i) => {
		el.addEventListener("click", () => {
			state.part = i;
			document.querySelector(".part.active").classList.remove("active");
			el.classList.add("active");
			loadSolution(users[state.index], state.year, state.day, state.part);
		});
	});

	[...Array(25)].forEach((_, i) => {
		const el = document.createElement("li");
		el.classList.add("nav-item");
		const aEl = document.createElement("a");
		aEl.classList.add("nav-link");
		aEl.classList.add("day");
		aEl.textContent = i + 1;
		aEl.style.visibility = i + 1 > new Date(Date.now()).getDate() ? "hidden" : "visible"
		aEl.addEventListener("click", () => {
			state.day = i;
			document.querySelector(".day.active").classList.remove("active");
			aEl.classList.add("active");
			loadSolution(users[state.index], state.year, state.day, state.part);
		});
		el.appendChild(aEl);
		document.getElementById("task").appendChild(el);
	});

	[...Array(currentYear - 2014).fill().map((_, idx) => 2015 + idx)].forEach((_, i) => {
		i += 2015;
		const el = document.createElement("li");
		el.classList.add("nav-item");
		const aEl = document.createElement("a");
		aEl.classList.add("nav-link");
		aEl.classList.add("year");
		aEl.textContent = i;
		aEl.addEventListener("click", () => {
			state.year = i;
			if (state.year === currentYear)
				document.querySelectorAll(".day").forEach(e => e.style.visibility = e.innerHTML > new Date(Date.now()).getDate() ? "hidden" : "visible");
			else
				document.querySelectorAll(".day").forEach(e => e.style.visibility = "visible");
			document.querySelector(".year.active").classList.remove("active");
			aEl.classList.add("active");
			loadSolution(users[state.index], state.year, state.day, state.part);
		});
		el.appendChild(aEl);
		document.getElementById("year").appendChild(el);
	});

	document.querySelectorAll(".list-group-item")[state.index].classList.add("active");
	document.querySelectorAll(".part")[state.part].classList.add("active");
	document.querySelectorAll(".year")[state.year - 2015].classList.add("active");
	document.querySelectorAll(".day")[state.day].classList.add("active");

	loadSolution(users[state.index], state.year, state.day, state.part);
});

if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
	const link = document.createElement("link");
	link.rel = "stylesheet";
	link.href = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/themes/prism-tomorrow.min.css";
	document.querySelector("head").appendChild(link);
}

