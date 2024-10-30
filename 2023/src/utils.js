/** Generates solution urls for GitHub. */
export function gitHubUrls({ user, repo, branch = "main", path }) {
  return {
    solutionUrl: (day, part) => {
      const p = path(day, part);
      return p ? `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${p}` : null;
    },
    solutionWebUrl: (day, part) => {
      const p = path(day, part);
      return p ? `https://github.com/${user}/${repo}/blob/${branch}/${p}` : null;
    },
  };
}

/** Pads the given number with the given number of zeros. */
export function pad(n, zeros) {
  return `${n}`.padStart(zeros, "0");
}
