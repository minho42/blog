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
PosixPath('/Users/minho/code')

>>> (Path(".") / "..").resolve()
PosixPath('/Users/minho')
```

### as_posix()

```python
# Return a string representation of the path with forward slashes (/)
>>> Path.cwd().as_posix()
'/Users/minho/code'
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
PosixPath('/Users/minho/code')

>>> str(Path.cwd())
'/Users/minho/code'
```

### parent/parents

```python
>>> Path.cwd().parent
PosixPath('/Users/minho')

>>> list(Path.cwd().parents)
[PosixPath('/Users/minho'), PosixPath('/Users'), PosixPath('/')]

>>> [*Path.cwd().parents]
[PosixPath('/Users/minho'), PosixPath('/Users'), PosixPath('/')]
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
('/', 'Users', 'minho', 'code')

>>> str(Path.cwd()).split("/")
['', 'Users', 'minho', 'code']
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

### home()

```python
>>> Path.home()
PosixPath('/Users/minho')
```

### expanduser()

```python
>>> Path("~").resolve()
PosixPath('/Users/minho/code/~')

>>> Path("~").expanduser()
PosixPath('/Users/minho')
```

### match(pattern)

```python
>>> Path("/my/blog/post.md").match("*.md")
True
```

### glob(pattern)/rglob(pattern)

```python
>>> sorted(Path(".").glob("*.py"))
[PosixPath('1.py'), PosixPath('2.py')]

# Recursive glob
>>> sorted(Path(".").rglob("*.py"))

>>> sorted(Path(".").rglob("*.py", case_sensitive=False))
```

### open()

```python
>>> p = Path() / "filename"
>>> with p.open() as f:
>>>     print(f.read())
```

### mkdir()/rmdir()

```python
>>> p = Path.cwd() / "new_dir"
>>> p
PosixPath('/Users/minho/code/new_dir')
>>> p.mkdir()
>>> p.mkdir(parents=True, exist_ok=True)
>>> p.rmdir()
```

### touch()/rename()/replace()/unlink()

```python
>>> p = Path("new_file.txt")
>>> p.touch()

>>> p2 = p.rename("new_file2.txt")

>>> p3 = p2.replace("new_file3.txt")

>>> p3.unlink()
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

### See also

[Python Tutorial: Pathlib - The Modern Way to Handle File Paths](https://youtu.be/yxa-DJuuTBI?si=QFFqrdChzbtZYBv9) by Corey Schafer
