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
>>> p = Path(".")
>>> p
PosixPath('.')
>>> p.resolve()
PosixPath('/Users/minhokim/code/adventofcode/2022')

>>> pp = p / ".." / ".."
>>> pp.resolve()
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
>>> r = Path("/")
>>> r2 = r / "etc"
>>> r2
PosixPath('/etc')
```

### exists()
```python
>>> r2.exists()
True
>>> r3 = r2 / "non_existent"
>>> r3
PosixPath('/etc/non_existent')
>>> r3.exists()
False
```

### is_dir()/is_file()
```python
>>> p.is_dir()
True

>>> p.is_file()
False
```

### cwd()
```python
>>> cwd = Path.cwd()
>>> cwd
PosixPath('/Users/minhokim/code/adventofcode/2022')
>>> str(cwd)
'/Users/minhokim/code/adventofcode/2022'
```

### parent
```python
>>> cwd.resolve().parent
PosixPath('/Users/minhokim/code/adventofcode')
```

### parents
```python
>>> list(cwd.resolve().parents)
[PosixPath('/Users/minhokim/code/adventofcode'), PosixPath('/Users/minhokim/code'), PosixPath('/Users/minhokim'), PosixPath('/Users'), PosixPath('/')]

>>> [*cwd.resolve().parents]
[PosixPath('/Users/minhokim/code/adventofcode'), PosixPath('/Users/minhokim/code'), PosixPath('/Users/minhokim'), PosixPath('/Users'), PosixPath('/')]
```

### iterdir()
```python
>>> list(p.iterdir())
[PosixPath('1.py'), PosixPath('2.py')]

>>> [*p.iterdir()]
[PosixPath('1.py'), PosixPath('2.py')]
```

### parts
```python
>>> cwd.parts
('/', 'Users', 'minhokim', 'code', 'adventofcode', '2022')

>>> str(cwd).split("/")
['', 'Users', 'minhokim', 'code', 'adventofcode', '2022']
```

### root
```python
>>> cwd.root
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
