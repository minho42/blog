---
title: Python venv doesn't work if directory names change
date: "2022-05-30"
---

I changed my python project directory, then venv (virtual environment) didn't work properly.
Easy way to fix is to remove the `venv` and just create a new one. But there's another way if you will.

/Users/minhokim
### Make a directory
```shell
mkdir project1
```

```shell
cd project1
```

### Create a virtual environment inside 
```shell
python3 -m venv venv
source venv/bin/activate 
```

```shell
(venv) > which python
/Users/minhokim/project1/venv/bin/python3.8

(venv) > echo $VIRTUAL_ENV
/Users/minhokim/project1/venv
```

### Change parent directory name
project1 -> project2

```shell
cd ../
mv project1 project2
cd project2
```

```shell
(venv) > deactivate
source venv/bin/activate 
```

### It's broken; venv is still pointing to previous directory name, project1

```shell
(venv) > echo $VIRTUAL_ENV
/Users/minhokim/project1/venv
```

### Change path to current

project1 -> project2

```shell
code venv/bin/activate
```

project2/venv/bin/activate
```python
...
VIRTUAL_ENV="/Users/minhokim/project1/venv"
export VIRTUAL_ENV
...
```

code venv/bin/pip

code venv/bin/pip3

code venv/bin/pip3.8

... etc

```python
#!/Users/minhokim/project1/venv/bin/python3.8
...
```
