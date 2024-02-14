---
title: Brace expansion
date: "2022-12-01"
---

[Brace expansion on Wiki](<https://en.wikipedia.org/wiki/Bash_(Unix_shell)#Brace_expansion>)

[Tweet from Wes Bos](https://twitter.com/wesbos/status/1594713484129931264?s=46&t=xxR2npOul7j-26Fdq8qkJQ)

Examples

```shell
❯ echo {1,2,3}
1 2 3
```

```shell
# Spaces are not allowed
echo {1, 2, 3}
zsh: parse error near `}'
```

```shell
❯ echo file{1,2,3}
file1 file2 file3
```

```shell
❯ echo file{,2,3}
file file2 file3
```

```shell
❯ echo file{1..3}
file1 file2 file3
```

```shell
❯ echo file{001..3}
file001 file002 file003
```

```shell
# Nested
❯ echo file{1,2{a,b},3}
file1 file2a file2b file3
```

```shell
❯ mkdir -p settings/{__init__,base,local}

❯ tree
.
└── settings
    ├── __init__
    ├── base
    └── local
```

```shell
❯ mkdir -p parent/{girl,boy}/{name,age}

❯ tree
.
└── parent
    ├── boy
    │   ├── age
    │   └── name
    └── girl
        ├── age
        └── name
```

```shell
❯ touch 11.{in,py}

❯ tree
.
├── 11.in
└── 11.py
```

```shell
❯ touch post_2022_{01..3}.md

❯ tree
.
├── post_2022_01.md
├── post_2022_02.md
└── post_2022-03.md
```

```shell
❯ touch test.js

❯ cp test{,_copy}.js

❯ tree
.
├── test.js
└── test_copy.js
```

```shell
❯ touch test.txt

❯ mv test.{txt,md}

❯ tree
.
└── test.md
```

```shell
❯ mv {,parent/}folder

❯ tree
.
└── parent
    └── folder
```

```shell
❯ curl https://httpstat.us/{417..418}
417 Expectation Failed418 I'm a teapot%
```
