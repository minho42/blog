---
title: Python namedtuple
date: "2022-12-30"
---

TIL

```python
>>> from collections import namedtuple

>>> nt = namedtuple('nt', ['value', 'id'])
>>> a = nt('item', '1')

>>> a
nt(value='item', id='1')

>>> a.value
'item'

>>> a.id
'1'
```

How I used (unnamed) tuple
in my solution for Advent of Code challenge [2022/day/20](https://adventofcode.com/2022/day/20)

```python
>>> items = ['🍚', '🍞']
>>> items_with_index = []
>>> for i, item in enumerate(items):
...     items_with_index.append((item, i))
...
>>> items_with_index
[('🍚', 0), ('🍞', 1)]

>>> items_with_index[0][0]
'🍚'
```

How it could've been done with `namedtuple`

```python
>>> from collections import namedtuple
>>> nt = namedtuple('nt', ['item', 'id'])

>>> items = ['🍚', '🍞']
>>> items_with_index = []
>>> for i, item in enumerate(items):
...     items_with_index.append(nt(item, i))
...
>>> items_with_index
[nt(item='🍚', id=0), nt(item='🍞', id=1)]

>>> items_with_index[0].item
'🍚'
```
