---
title: Shell aliases for uv
date: "2024-04-04"
---

```shell
# .zshrc
alias createvenv="uv venv && source .venv/bin/activate && touch requirements.in"
alias uvinstall="uv pip install -r requirements.in"
alias uvcompile="uv pip compile requirements.in -o requirements.txt"
```
