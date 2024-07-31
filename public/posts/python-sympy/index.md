---
title: Python SymPy
date: "2022-12-24"
---

TIL

SymPy

[github](https://github.com/sympy/sympy), [docs](https://docs.sympy.org/latest/modules/solvers/solvers.html#solvers)

This library can solve equations (방정식) in Python

```shell
pip install sympy
```

To solve following equations

`10 = 7 + x`

Change the equations like below to one side

0 = `7 + x - 10`

```python
>>> from sympy import Symbol
>>> from sympy.solvers import solve

>>> x = Symbol("x")
>>> q = "7 + x - 10"
>>> solve(q)
[3]
```

Used sympy in my solution for Advent of Code challenge [2022/day/21](https://adventofcode.com/2022/day/21)
