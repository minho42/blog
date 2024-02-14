---
title: Why Tailwind CSS doesn't render markdown in React/Next.js
date: "2022-04-26"
---

## Issue

When I initially made this static blog with Next.js following this tutorial — [Static Blog With Next.js and Markdown](https://youtu.be/MrjeefD8sac) — below `/[slug].js` code didn't render markdown properly.

```js
// pages/post/[slug].js
import { marked } from "marked"

export default function PostPage({ ..., content }) {
    return <div className="" dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
}
```

Upon inspecting elements, I noted that markdown contents are rendered with appropriate HTML tags.

```js
// Inspecting by logging and looking at Elements in Chrome Developer Tools
console.log(marked(content))
```

This markdown blog post...

```markdown
<!-- markdown post -->

# title1
```

will turn into this HTML

```html
<!-- HTML rendered in DOM -->
<h1>title1</h1>
```

But the respective CSS for the HTML elements were not applied as I was using Tailwind CSS.
Turns out Tailwind CSS negates the defaults styles and you need to specify each elements how it should look.
`<h1>title1</h1>` will just be a text with default font size.

## Solution

[@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)

## Usage

### Install plugin package

```shell
npm i -D @tailwindcss/typography
```

### Configure

```js
// tailwind.config.js
module.exports = {
  // ...
  plugins: [require("@tailwindcss/typography")],
  //   ...
}
```

### Add `prose` class

```js
// pages/post/[slug].js
<div className="prose" dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
```

That's it.

### What is `prose`

`prose` class adds pre-defined set of styles for all that come inside the scope.

For example,
`h1` tag in `<h1>title1</h1>` will have following css applied behind the scene.

```css
.prose :where(h1):not(:where([class~="not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 800;
  font-size: 2.25em;
  margin-top: 0;
  margin-bottom: 0.8888889em;
  line-height: 1.1111111;
}
```

You can tweak `prose` class by adding additional classes related to `prose` like so

```js
// pages/post/[slug].js
<div className="prose prose-lg" dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
```

`<h1>title1</h1>` will then have following styles instead

```css
.prose-lg :where(h1):not(:where([class~="not-prose"] *)) {
  font-size: 2.6666667em;
  margin-top: 0;
  margin-bottom: 0.8333333em;
  line-height: 1;
}
```

You can customize further by applying more of provided class names or overriding the CSS entirely in your css file like so

```js
// pages/post/[slug].js
<div className="prose prose-lg prose-pre:p-0" dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
```

```css
/* styles/globals.css */
.prose :not(pre *):where(code):not(:where([class~="not-prose"] *)) {
  margin: 0;
}

.prose :where(a):not(:where([class~="not-prose"] *)) {
  @apply text-blue-700 !important;
}
```
