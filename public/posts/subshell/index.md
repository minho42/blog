---
title: TIL subshell
date: "2024-09-07"
---

I wanted to execute a python scraper without having to navigate to the folder, activate the virtual environment (venv), and run the script.

So, I created an alias to do this. It worked, but after running the aliased command, I was moved to the directory where the file exists, and the venv remained activated.

```shell
alias canirecycle='cd /Users/minho/code/python/return-and-earn && activate && python main.py'
```

I asked ChatGTP if I could do it without changing my current working directory. The solution was very simple: use parentheses `()`.

```shell
alias canirecycle='(cd /Users/minho/code/python/return-and-earn && activate && python main.py)'
```

```shell
~
❯ canirecycle
Checking for woolworths-marsfield...
Glass:          Full | Not Busy
Plastic & cans: Full | Not Busy

~
❯
```

> The parentheses () create a **subshell** that temporarily changes the directory, activates the virtual environment, and runs the script.
> After the subshell completes, it exits, and you remain in your original directory.

### See also

https://www.geeksforgeeks.org/shell-scripting-subshell/

> Placing a list of commands between parentheses forces the shell to create a subshell, and each of the commands in list is executed in that subshell environment.

https://www.geeksforgeeks.org/shell-scripting-subshell/

> One useful feature of subshells is that they allow you to isolate the effects of certain commands or operations. For example, you can use a subshell to set temporary variables or change directories without affecting the parent shell’s environment.
