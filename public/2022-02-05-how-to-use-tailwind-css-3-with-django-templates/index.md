---
title: How to use Tailwind CSS 3 with Django templates
date: "2022-02-05"
---

### Usage

```shell
mkdir jstoolchain

cd jstoolchain

npm init -y

npm install -D tailwindcss

npx tailwindcss init
```

jstoolchain/tailwind.config.js

```js
module.exports = {
  content: ["../templates/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

```shell
mkdir css

touch css/tailwind.css
```

jstoolchain/css/tailwind.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

jstoolchain/package.json

```json
"scripts": {
    "build": "npx tailwindcss -i css/tailwind.css -o ../static/css/tailwind-output.css"
  },
```

jstoolchain/

```shell
npm run build
```

templates/base.html

```html
{% load static %}

<head>
  <link rel="stylesheet" href="{% static 'css/tailwind-output.css' %}" />
</head>
```

Now you can use tailwind css inside django templates, but you need to go through the build process (`npm run build` from above) each time new tailwind css was introduced.

In order to automate this build process, add following `dev` script to the package.json

jstoolchain/package.json

```json
"scripts": {
    "build": "npx tailwindcss -i css/tailwind.css -o ../static/css/tailwind-output.css",
    "dev": "nodemon --watch '../templates/**/*' -e html -x 'npm run build'"
  },
```

jstoolchain/

```shell
npm run dev
```

Any changes in \*.html files in django templates directory can trigger build script and changes will be applied without manually typing `npm run build`
