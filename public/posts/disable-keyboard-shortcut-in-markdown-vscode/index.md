---
title: Disable "Command + B" in markdown in VS Code
date: "2024-08-19"
---

### How to disable "Command + B" in markdown so VS Code toggles Primary Side Bar while editing markdown files

I keep my side bar on the left and toggle it quite frequently using keyboard shortcut (Command + B).
Markdown file overrides this keyboard shortcut and instead puts \*\*\*\* for bold text.

I disabled this on my previous mac, but I forgot how I did it.

## Here's how

1. Command pallet (Shift + Command + P)
2. Search and select `Preferences: Open Keyboard Shortcuts (JNSON)`
3. Edit `keybindings.json`

```json
[
  {
    "key": "cmd+b",
    "command": "workbench.action.toggleSidebarVisibility",
    "when": "!editorLangId == markdown"
  }
]
```
