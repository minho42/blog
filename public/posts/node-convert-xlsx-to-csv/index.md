---
title: Convert xlsx to csv with Node.js
date: "2023-04-12"
---

Searching such a package directed to npm package 'xlsx'.
However, this package has different repo name, _sheetjs_, and '_npm i xlsx_' is not the recommended way (registry out of date). wth.

https://github.com/SheetJS/sheetjs

[Install](https://docs.sheetjs.com/docs/getting-started/installation/nodejs#installation)

```shell
npm i -D https://cdn.sheetjs.com/xlsx-0.19.2/xlsx-0.19.2.tgz
```

## xlsx -> csv

```js
import fs from "fs"
import { readFile, writeFile, set_fs } from "xlsx"
set_fs(fs) // still works without this line... idk

const wb = readFile("schools.xlsx")
writeFile(wb, "schools.csv", { bookType: "csv" })
```

My csv file had extra information on the first line. Here's a snippet to remove the first line from the csv file

```js
const data = fs.readFileSync("schools.csv", "utf-8")
const data2 = data.split("\n").splice(1).join("\n")
fs.writeFileSync("schools.csv", data2)
```

### Related

[convert csv to json](/posts/convert-csv-to-json)
