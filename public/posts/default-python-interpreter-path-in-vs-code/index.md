---
title: Default Python interpreter path in VS Code
date: "2022-05-07"
---

If you're using Python in VS Code, and see VS Code not finding interpreter properly or keeps asking to select interpreter, try to change the `settings.json` like below.

Make sure `venv` is created and activated

```shell
python3 -m venv venv

source venv/bin/activate
```

VS Code `settings.json`

```json
"python.defaultInterpreterPath": "./venv/bin/python3",
```
