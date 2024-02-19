---
title: Convert CSV to JSON in Node.js
date: "2024-02-04"
---

```shell
pip install csvtojson
```

```js
// index.js
// data.csv -> data.json
const fs = require("fs")
const csvPath = "./data.csv"
const csv = require("csvtojson")

async function main() {
  const jsonArray = await csv({
    noheader: false,
    headers: ["id", "category"],
  }).fromFile(csvPath)

  fs.writeFileSync("data.json", JSON.stringify(jsonArray))
}

main()
```

```shell
node index.js
```

### Related

[convert xlsx to csv](/posts/node-convert-xlsx-to-csv)
