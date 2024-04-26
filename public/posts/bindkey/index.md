---
title: TIL bindkey, F5 to reload zsh
date: "2024-04-25"
---

TIL: bindkey

```shell
# ~/.zshrc
# F5 to reload zsh
bindkey -s "^[[15~" "source ~/.zshrc\n"
```
