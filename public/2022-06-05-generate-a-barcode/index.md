---
title: Generate a barcode
date: "2022-06-05"
---

Making my own [coles gift card tracker app](https://github.com/minho42/coles),
I needed to generate a barcode programmatically. I needed what Stocard generates which was found to be 'code128'. This barcode class is also the default in JsBarcode for javascript.

## With Python

[python-barcode](https://github.com/WhyNotHugo/python-barcode)

```shell
pip install python-barcode
```

```python
from barcode.base import Barcode
import barcode

def generate_barcode(number, filename):
    Barcode.default_writer_options["write_text"] = False
    CODE128 = barcode.get_barcode_class("code128")
    my_code = CODE128(number)
    my_code.save(filename)
```

Above python code generates barcode image in SVG in the current directory.

e.g. `my_code.save('barcode1')` -> creates `barcode1.svg`

If you don't know which barcode class to use, just generate all barcodes provided and compare to find it like below.

```python
def _find_which_barcode_class(number):
    barcodes = barcode.PROVIDED_BARCODES
    # ['codabar',
    # 'code128',
    # 'code39',
    # 'ean',
    # 'ean13',
    # 'ean13-guard',
    # 'ean14',
    # 'ean8',
    # 'ean8-guard',
    # 'gs1',
    # 'gs1_128',
    # 'gtin',
    # 'isbn',
    # 'isbn10',
    # 'isbn13',
    # 'issn',
    # 'itf',
    # 'jan',
    # 'nw-7',
    # 'pzn',
    # 'upc',
    # 'upca']

    for code in barcodes:
        try:
            classname = barcode.get_barcode_class(code)
            my = classname(number)
            my.save(f"barcode_{code}")
        except:
            pass
```

## With Javascript

[JsBarcode](https://github.com/lindell/JsBarcode)

```html
<svg id="barcode"></svg>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jsbarcode/3.11.5/barcodes/JsBarcode.code128.min.js"></script>
```

```js
JsBarcode("#barcode", "1234567890", { format: "CODE128", displayValue: false })
```

First, I tried to generate a barcode in django with above python code. This required extra field in the django model to track barcode file, and worse I had to deal with static/media files. This happened to be non-trivial.

As barcode can be easily generated on the frontend. I switched to generate with javascript code inside the django template.
