---
title: Hello MDX
date: "2024-02-13"
---

## Hello MDX

<Counter />

Tried to add MDX to my blog a number of times following Next.js docs. I failed every time and gave up.

Encountered [Dan](https://twitter.com/dan_abramov2)'s [blog](https://overreacted.io/), and got curious how he'd done MDX.
First thing I checked in his [repo](https://github.com/gaearon/overreacted.io) was `package.json`.
It showed a package called `next-mdx-remote`.
This package has simple but working documentation for Next.js 13+ (App Router, React Server Component).

I later found out that the Next.js MDX documentation
also includes a [section](https://nextjs.org/docs/pages/building-your-application/configuring/mdx#remote-mdx) about `next-mdx-remote` which is not up to date.

Dan is using other packages I haven't heard of. Some I still haven't checked out. This is a good way to learn new stuff I guess. Much better than struggling with bad documentation.

He is also using custom JavaScript to refresh the page when target directory changes. Good stuff.

The package I used before, `react-markdown`, didn't support `js` as code block language.

`rehype-pretty-code` supports `js`.

My repo where I used the package: [app/[slug]/page.tsx](https://github.com/minho42/blog/blob/master/app/%5Bslug%5D/page.tsx)

### Packages used

- next-mdx-remote
- rehype-pretty-code
  - shiki
- remark-gfm

### TIL

- I don't need to use `.mdx` extension in order to use MDX.

## Errors encountered

1. [Async Server Component TypeScript Error](https://nextjs.org/docs/app/building-your-application/configuring/typescript#async-server-component-typescript-error)

> 'Promise\<Element>' is not a valid JSX element

Fix: update `@types/react` and `typescript`

```shell
npm i -D @types/react/latest typescript/latest
```

2. cannot set properties of undefined (setting 'intable')

Fix: downgrade `remark-gfm` from 4.0.0 to 3.0.1

3. Use of `<-`

> Unexpected character `-` (U+002D) before name, expected a character that can start a name, such as a letter, `$`, or `_`

Fix: I don't know. Just removed `<-`

4. Not escaping characters

Fix: escape `<>`, `{}`, `${}`, etc.

- brackets: `<A>` to `\<A>` if not React component
- curly braces: `text-{color}` to `text-\{color}`
- `${var}` to `` `${var}` ``
