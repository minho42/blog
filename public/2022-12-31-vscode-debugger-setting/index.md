---
title: VS Code debugger settings
date: "2022-12-31"
---

Debugging with VS Code

## Problem

VS Code debugger runs on the root directory of the file (default).

This default behavior of the debugger may cause following errors if the file you want to debug is not on the root directory.

```python
Exception has occurred: FileNotFoundError
[Errno 2] No such file or directory: 'app.in'
  File "/Users/code/utils.py", line 5, in read_input
    with open(path, "r") as f:
  File "/Users/code/app.py", line 5, in <module>
    lines = read_input("app.in")
```

## Solution

Set `cwd` in the debugger settings, `.vscode/launch.json`

> "cwd": Absolute path to the working directory of the program being debugged. Default is the root directory of the file.

## Values of `cwd`

- `${fileDirname}`

  - The current opened file's dirname
  - This will run the debugger on the currently opened file instead of the root directory opened in VS Code

- `${workspaceFolder}`
  - Default value
  - Root directory
  - You can specify relative path from the root directory like so: `${workspaceFolder}/2022`

Sample `.vscode/launch.json`

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Python: Current File",
      "type": "python",
      "request": "launch",
      "program": "${file}",
      "console": "integratedTerminal",
      "justMyCode": true
    },
    {
      "name": "Python: Current File",
      "type": "python",
      "request": "launch",
      "program": "${file}",
      "console": "integratedTerminal",
      "justMyCode": true,
      "cwd": "${fileDirname}"
    }
  ]
}
```

Pressing `Control + Space` inside `"configurations"` will show available options. This also works for the values inside double quotes.

```json
"configurations": [
    {
        // 👈 Control + Space here
        "cwd": "👇 and here"
    }
]
```
