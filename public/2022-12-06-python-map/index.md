---
title: Python map
date: "2022-12-06"
---

TIL

There is a built-in Python function called `map`.

Python official [documentation](https://docs.python.org/3/library/functions.html#map) has it listed...

> map(function, iterable, *iterables)
> 
>Return an iterator that applies function to every item of iterable, yielding the results.

But doesn't have any example code (maybe a good opportunity to contribute?)


Examples

```python
>>> a, b = map(int, ["123", "007"])
>>> a
123
>>> b
7
```

```python
>>> a, b = map(len, ["apple", "banana"])
>>> a
5
>>> b
6
```

```python
>>> def add(n):
...     return n + n

>>> result = map(add, [1, 2, 3, 4])
>>> list(result)
[2, 4, 6, 8]
```


Snippets from [minho42](https://github.com/minho42/adventofcode/blob/master/2022/04.py), [hyper-neutrino](https://github.com/hyper-neutrino/advent-of-code/blob/main/2022/day04p1.py)
```python
line = "1-2,3-4"

# How I did
a, b, c, d = [int(x) for x in line.replace(",", " ").replace("-", " ").split()]

# How it could've been done
a, b, c, d = map(int, line.replace(",", "-").split("-"))
```