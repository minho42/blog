---
title: HEIC converter in Python and Node
date: "2023-12-20"
---

CLI program that converts HEIC to jpg

## Python ([repo](https://github.com/minho42/heic-converter-py))

### Install

```shell
pip install fire Pillow pillow_heif
```

### Code

```python
# heic_converter.py
import fire
from PIL import Image
from pillow_heif import register_heif_opener
from pathlib import Path


def heic_converter(filename):
    register_heif_opener()
    img = Image.open(filename)
    img2 = (
        Path(Path(filename).resolve().parent / Path(filename).stem).as_posix() + ".jpg"
    )
    img.save(img2)


if __name__ == "__main__":
    fire.Fire(heic_converter)

```

### Use

```shell
# image.HEIC -> image.jpg
python heic_converter.py image.HEIC
```

---

## Node ([repo](https://github.com/minho42/heic-converter-js))

### Install

```shell
npm i commander heic-convert
```

### Code

```js
// index.js
const fs = require("fs")
const path = require("path")
const { program } = require("commander")
const { promisify } = require("util")
const heicConvert = require("heic-convert")

const convert = async (filename, quality) => {
  const inputBuffer = await promisify(fs.readFile)(filename)
  const outputBuffer = await heicConvert({
    buffer: inputBuffer,
    format: "JPEG",
    quality,
  })

  const basePath = path.dirname(filename)
  const name = path.basename(filename, path.extname(filename))
  const newFilename = path.join(basePath, `${name}.jpg`)

  await promisify(fs.writeFile)(newFilename, outputBuffer)
}

program.option("-f, --filename <char>").option("-q, --quality <char>", "quality", "0.5")
program.parse()

convert(program.opts().filename, program.opts().quality)
```

### Use

```shell
# image.HEIC -> image.jpg
node index.js -f image.HEIC
node index.js -f image.HEIC -q 0.5
```
