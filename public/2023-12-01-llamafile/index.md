---
title: llamafile
date: "2023-12-01"
---

https://github.com/Mozilla-Ocho/llamafile

Simon Willison's step by step instructions ([link](https://simonwillison.net/2023/Nov/29/llamafile/)) didn't work on my machine.

Here's what worked :

```shell
❯ wget https://huggingface.co/jartine/llava-v1.5-7B-GGUF/resolve/main/llamafile-server-0.1-llava-v1.5-7b-q4

❯ chmod 755 llamafile-server-0.1-llava-v1.5-7b-q4

❯ xattr -d com.apple.quarantine ./llamafile-server-0.1-llava-v1.5-7b-q4

❯ sh -c ./llamafile-server-0.1-llava-v1.5-7b-q4
```

Visit http://127.0.0.1:8080

It works. 
But extremely slow on my macbook

```shell
❯ system_profiler SPHardwareDataType sw_vers
Hardware:

    Hardware Overview:

      Model Name: MacBook Pro
      Processor Name: Dual-Core Intel Core i5
      Processor Speed: 2.8 GHz
      Memory: 8 GB
      ...
```
