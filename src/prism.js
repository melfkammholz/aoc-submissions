// You may add syntax highlighting for your programming language here if
// it is currently unsupported by PrismJS.

// Syntax highlighting for Lean
Prism.languages.lean = {
  // Comments and strings must come first
  'comment': {
    pattern: /\/-[\s\S]*?-\//,
    greedy: true
  },
  'line-comment': {
    pattern: /--.*/,
    greedy: true,
    alias: 'comment'
  },
  'string': {
    pattern: /"(?:\\.|[^"\\])*"/,
    greedy: true
  },
  'char': {
    pattern: /'(?:\\.|[^'\\])'/,
    greedy: true
  },

  // Attributes: @[simp], @[inline], etc
  'attribute': {
    pattern: /@\[[^\]]*\]/,
    alias: 'annotation'
  },

  // Lean commands
  'command': {
    pattern: /(^|\s)#(?:check|eval|print|reduce|synth|find|find_home|exit|help|guard|assert|compile|lint|where|check_failure)\b/,
    lookbehind: true,
    alias: 'builtin'
  },

  // Tactics
  'tactic': {
    pattern: /\b(?:aesop|apply|assumption|at_cases|cases|case|change|clear|constructor|contradiction|convert|decide|exact|exists|ext|exfalso|fail_if_success|fun_prop|generalize|have|intro|intros|left|let|linarith|norm_num|omega|positivity|push_neg|rcases|refine|rename_i|repeat|right|rfl|ring|rw|rwa|simp|simpa|specialize|split|subst|symm|tauto|trivial|unfold|use|omega|with_reducible|by_contra|by_cases|induction|infer_instance)\b/,
    alias: 'keyword'
  },

  // Declaration names
  'class-name': {
    pattern: /\b(?:def|theorem|lemma|example|structure|inductive|class|abbrev|opaque|axiom|constant|instance|syntax|macro|elab)\s+[\w\u00C0-\uFFFF'.]+/,
    lookbehind: true
  },

  // Declaration and control-flow keywords
  'keyword': /\b(?:abbrev|axiom|by|calc|class|coee|coinductive|do|else|end|example|export|extends|for|fun|have|if|import|in|inductive|infix|infixl|infixr|instance|let|macro|match|namespace|noncomputable|notation|opaque|open|partial|postfix|prefix|private|protected|public|return|section|set_option|structure|syntax|then|theorem|universe|where|with|deriving|mutual|termination_by|decreasing_by|unsafe|scoped|macro_rules|elab_rules|attribute|initialize|builtin_initialize|include|omit|variable|variables|parameters|universes|local|global|extern|implemented_by|extends|do|try|catch|finally)\b/,

  // Common Lean types and constructors
  'builtin': /\b(?:Nat|Int|Rat|Float|Bool|Char|String|Unit|True|False|Prop|Type|Sort|List|Array|Option|Except|Sum|Prod|Subtype|Fin|BitVec|IO|Task|ExceptT|StateM|ReaderM|WriterM|ExceptT|Decidable|DecidableEq|Inhabited|Repr|BEq|Ord|Hashable|Monad|Functor|Applicative|Alternative|Foldable|Traversable|Eq|Ne|And|Or|Not|Iff|Exists|Nonempty|Empty|PUnit|ULift|PLift|Id|PProd|PSigma|Sigma|Pi|HEq|rfl)\b/,

  // Boolean and special constants
  'boolean': /\b(?:true|false)\b/,
  'constant': /\b(?:sorry|admit|by_cases|rfl|trivial|default|inferInstance|inst|none|some|nil|cons)\b/,

  // Numeric literals, including hexadecimal and binary
  'number': /\b(?:0[xX][\da-fA-F]+|0[bB][01]+|(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?)\b/,

  // Identifiers with common function-call syntax
  'function': {
    pattern: /\b[\w\u00C0-\uFFFF][\w\u00C0-\uFFFF']*(?=\s*\()/,
    alias: 'function'
  },

  // Operators, including common Unicode mathematical symbols
  'operator': /:=|=>|->|<-|<->|==|!=|<=|>=|&&|\|\||\+\+|::|\.\.|\.\.\.|[+\-*\/^%=<>!&|~?]+|[∀∃λΠΣ∧∨¬↔→←↦∘≤≥≠≃≈≡∈∉⊆⊂∪∩∅ℕℤℚℝℂ∞∑∏∫]/,

  // Punctuation and delimiters
  'punctuation': /[{}[\];(),.:]/,

  'symbol': /[⟨⟩⌈⌉⌊⌋⦃⦄]/
};

