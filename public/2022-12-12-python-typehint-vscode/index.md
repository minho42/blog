---
title: Python type hints in VS Code
date: "2022-12-12"
---

I have been using Python type hints occasionally, but never really checked if it's enforced.

Turns out it hasn't been working.

Well default setting in VS Code is turned off.
This is an odd default setting as type hints are optional and those who choose to add type hints would expect it to do something.

Let's turn it on.

Before

```json
"python.analysis.typeCheckingMode": "off",
```

After

```json
"python.analysis.typeCheckingMode": "basic",
```
