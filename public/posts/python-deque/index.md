---
title: Python deque
date: "2022-12-06"
---

TIL

[collections.deque](https://docs.python.org/3/library/collections.html#collections.deque)

Example

```python
>>> from collections import deque

>>> d = deque([1,2])
deque([1, 2])

>>> d.appendleft(0)
deque([0, 1, 2])

>>> d.append(3)
deque([0, 1, 2, 3])

>>> d.extend([4,5])
deque([0, 1, 2, 3, 4, 5])

>>> d.extendleft([-1])
deque([-1, 0, 1, 2, 3, 4, 5])

>>> d.pop()
5
deque([-1, 0, 1, 2, 3, 4])

>>> d.popleft()
-1
deque([0, 1, 2, 3, 4])

>>> d.remove(4)
deque([0, 1, 2, 3])

>>> d.count(3)
1

>>> d.index(3)
3

>>> d.rotate()
deque([3, 0, 1, 2])

>>> d.rotate(-2)
deque([1, 2, 3, 0])

>>> d.reverse()
deque([0, 3, 2, 1])
```
