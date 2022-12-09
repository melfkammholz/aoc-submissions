// https://prismjs.com/index.html#supported-languages
const lang = (name, prismLang) => ({
  langName: name,
  lang: _ => prismLang
});

const langs = {
  csharp: lang("C#", "csharp"),
  cpp: lang("C++", "cpp"),
  fsharp: lang("F#", "fsharp"),
  haskell: lang("Haskell", "haskell"),
  java: lang("Java", "java"),
  python: lang("Python", "python"),
  rust: lang("Rust", "rust")
};

export default langs;

