---
title: Python pathlib
date: "2022-12-12"
---

It's been a while since Django replaced `os.path` to `pathlib.Path`.
More than 3 years to be exact now that I look it up.
So I have been kind of using it in my `settings.py`.
But not really.
Because once you copy and paste it that's it.
You rarely go back to touch those few lines of code in the settings file.

It was one of those things that's put in the back burner and never looked back.

`Advent of Code` is helping me to learn basic Python skills and syntaxes.

Here are some [pathlib](https://docs.python.org/3/library/pathlib.html) examples.

```python
from pathlib import Path
```

### resolve()

```python
# Make the path absolute, resolving any symlinks. A new path object is returned
>>> Path(".")
PosixPath('.')

>>> Path(".").resolve()
PosixPath('/Users/minhokim/code/adventofcode/2022')

>>> (Path(".") / ".." / "..").resolve()
PosixPath('/Users/minhokim/code')
```

### as_posix()

```python
# Return a string representation of the path with forward slashes (/)
>>> Path('/Users/minhokim/code').as_posix()
'/Users/minhokim/code'
```

### navigating

```python
>>> Path("/") / "etc"
PosixPath('/etc')
```

### exists()

```python
>>> Path("/").exists()
True

>>> (Path("/") / "non_existent")
False
```

### is_dir()/is_file()

```python
>>> Path(".").is_dir()
True

>>> Path(".").is_file()
False
```

### cwd()

```python
>>> Path.cwd()
PosixPath('/Users/minhokim/code/adventofcode/2022')

>>> str(Path.cwd())
'/Users/minhokim/code/adventofcode/2022'
```

### parent

```python
>>> Path.cwd().parent
PosixPath('/Users/minhokim/code/adventofcode')
```

### parents

```python
>>> list(Path.cwd().parents)
[PosixPath('/Users/minhokim/code/adventofcode'), PosixPath('/Users/minhokim/code'), PosixPath('/Users/minhokim'), PosixPath('/Users'), PosixPath('/')]

>>> [*Path.cwd().parents]
[PosixPath('/Users/minhokim/code/adventofcode'), PosixPath('/Users/minhokim/code'), PosixPath('/Users/minhokim'), PosixPath('/Users'), PosixPath('/')]
```

### iterdir()

```python
>>> list(Path(".").iterdir())
[PosixPath('1.py'), PosixPath('2.py')]

>>> [*Path(".").iterdir()]
[PosixPath('1.py'), PosixPath('2.py')]
```

### parts

```python
>>> Path.cwd().parts
('/', 'Users', 'minhokim', 'code', 'adventofcode', '2022')

>>> str(Path.cwd()).split("/")
['', 'Users', 'minhokim', 'code', 'adventofcode', '2022']
```

### root

```python
>>> Path.cwd().root
'/'
```

### name/suffix/suffixes/stem

```python
>>> Path("/my/blog/post.md").name
'post.md'

>>> Path("/my/blog/post.md").suffix
'.md'

>>> Path("/my/blog/post.md").suffixes
['.md']

>>> Path("/my/blog/post.md").stem
'post'
```

### match(pattern)

```python
>>> Path("/my/blog/post.md").match("*.md")
True
```

### glob(pattern)

```python
>>> sorted(Path(".").glob("*.py"))
[PosixPath('1.py'), PosixPath('2.py')]
```

```python
# Use of `pathlib` in Django `settings.py`
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

STATICFILES_DIRS = [BASE_DIR / "static"]
```

`__file__` doesn't work in REPL

```python
>>> Path(__file__)
NameError: name '__file__' is not defined.
```
