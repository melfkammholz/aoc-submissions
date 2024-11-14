# aoc-submissions

A small website showcasing different solutions for the Advent of Code.

[The live page can be found here.](https://melfkammholz.github.io/aoc-submissions/)

## Make Your Code Available

Depending on how versed you are in managing your code with git, you might want
to opt for different approaches. 
- If you have never worked with git before, then learning git might be a 
  daunting task. If you want to take it easy, choose GitHub to host your code, 
  [you can use the web UI upload and edit files](https://docs.github.com/en/repositories). 
  GitLab offers [similar ways of managing code](https://docs.gitlab.com/ee/user/project/repository/)
  as well.
- If you are up for the challenge, you may use [this resource](https://git-scm.com/)
  as a starting point. There are also many video tutorials and cheatsheets 
  available online.


## Showcase Your Solutions

If you want to showcase your solutions for Advent of Code, please issue a pull
request. This pull request should contain your personal entry in 
`src/users.js`. An entry looks like this in its simplest form:


```js
{
  // the name displayed in the submission board
  name: "Ron Swanson",

  // indicator for PrismJS which syntax highlighting to use
  // see https://prismjs.com/#supported-languages
  lang: _ => "clike",

  // the name of your programming language display in the submission board
  langName: _ => "C",

  // the URL used for fetching the raw source file of a given day and part
  solutionUrl: (day, part) =>
    `https://raw.githubusercontent.com/ronswanson/aoc2024/master/day${day}/${part}.c`,

  // the URL used for referring to your solution via "View Source"
  solutionWebUrl: (day, part) =>
    `https://github.com/ronswanson/aoc2024/blob/master/day${day}/${part}.c`
}
```

This website uses PrismJS for syntax highlighting. Please make sure that you
[choose the correct abbreviation](https://prismjs.com/#supported-languages) 
for your programming language. There are some abstractions for providing all
necessary URLs available. You may want to use the entries of others as an 
example.


## Local Development

Since the page uses ES6 modules, you'll need a web server to test the page 
locally. If you have Python installed, you can e.g. run

```sh
python3 -m http.server
```
