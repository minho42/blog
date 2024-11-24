---
title: Alias to check Storage from terminal on macOS
date: "2024-11-24"
---

Here are common ways to check storage on macOS

-  -> About This Mac -> More Info... -> Storage

- System Settings -> General -> Storage

- Using Raycast or Alfred: search for "Storage"

```shell
431.65 GB of 494.38 GB used
```

Here's how to create an alias to check storage on terminal, but I wanted to see free space rather than used space

## Alias

`~/.zshrc`

```shell
alias storage="diskutil info / | grep 'Container' | awk '/Free Space/ {free=\$4; unit=\$5} /Total Space/ {total=\$4} END {print free, unit, \"of\", total, unit, \"free\"}'"
```

## Usage and output

```shell
❯ storage
57.0 GB of 494.4 GB free
```

## Breakdown of the alias

### `diskutil info /`

Displays disk information for the root volume `/`.

```shell
❯ diskutil info /
   Device Identifier:         disk3s1s1
   Device Node:               /dev/disk3s1s1
   Whole:                     No
   Part of Whole:             disk3

   Volume Name:               Macintosh HD
   Mounted:                   Yes
   Mount Point:               /
   ...
   ...
```

### `| grep 'Container'`

Filters lines containing "Container"

```shell
❯ diskutil info / | grep 'Container'
   Container Total Space:     494.4 GB (494384795648 Bytes) (exactly 965595304 512-Byte-Units)
   Container Free Space:      57.0 GB (57048616960 Bytes) (exactly 111423080 512-Byte-Units)
   APFS Container:            disk3

```

### `| awk`

Processes and extracts values

- `/Free Space/ {free=$4; unit=$5}`

  Captures the line with "Free Space", and assign 4th column to variable `free`, 5th column to `unit`

- `/Total Space/ {total=$4}`

  Captures the line with "Total Space", and assign 4th column to variable `total`

- `{print free, unit, "of", total, unit, "free"}`

  Print the text with variables assigned

### Run the whole commands

```shell
❯ diskutil info / | grep 'Container' | awk '/Free Space/ {free=$4; unit=$5} /Total Space/ {total=$4} END {print free, unit, "of", total, unit, "free"}'
57.0 GB of 494.4 GB free
```

### Use escaped characters for `$` (`\$`) and `"` (`\"`) for alias to work like so

```shell
alias storage="diskutil info / | grep 'Container' | awk '/Free Space/ {free=\$4; unit=\$5} /Total Space/ {total=\$4} END {print free, unit, \"of\", total, unit, \"free\"}'"
```
