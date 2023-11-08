/** Generates solution urls for GitHub. */
export function gitHubUrls({ user, repo, branch = "main", path }) {
  return {
    solutionUrl: (day, part) => `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${path(day, part)}`,
    solutionWebUrl: (day, part) => `https://github.com/${user}/${repo}/blob/${branch}/${path(day, part)}`,
  };
}

/** Pads the given number with the given number of zeros. */
export function pad(n, zeros) {
  return `${n}`.padStart(zeros, "0");
}
