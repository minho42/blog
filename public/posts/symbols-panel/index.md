---
title: GitHub-like symbols panel
date: "2023-08-18"
---

Looking at the Symbols panel on GitHub made me to want to implement (copy) my own.

---

<Editor />

---

### Pet peeve

CodeMirror documentation is so scarce.

### Issues

- Editor loads very slowly
- When definition or references are selected, selected line is not highlighted in the editor view
- Arrow functions are not collected in Symbols
  - Need to use `ArrowFunctionExpression` along with `FunctionDeclaration` inside traverse()
  - Need to access function name with `path.container.id.name` rather than `path.node.id.name`
