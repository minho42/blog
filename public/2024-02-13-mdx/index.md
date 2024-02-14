---
title: MDX
date: "2024-02-13"
---

## Hello MDX

<Counter />

Tried to add MDX to my blog a number of times following Next.js docs. I failed every time and gave up.

Encountered [Dan](https://twitter.com/dan_abramov2)'s [blog](https://overreacted.io/), and got curious how he'd done MDX.
First thing I checked in his [repo](https://github.com/gaearon/overreacted.io) was `package.json`.
It showed a package called [next-mdx-remote](https://www.npmjs.com/package/next-mdx-remote).
This package has simple but working [documentation](https://github.com/hashicorp/next-mdx-remote) for Next.js 13+ (App Router, React Server Component).

```js
// MDX works
import { MDXRemote } from "next-mdx-remote/rsc"

export default function Page() {
  return <MDXRemote source={content} />
}
```

```js
// Load React components with your own rules
import { MDXRemote } from "next-mdx-remote/rsc"

export default function Page({ params }) {
  let postComponents = {}
  try {
      postComponents = await import("xx/components")
  } catch (e) {
    ...
  }

  return <MDXRemote source={content} components={postComponents} />
}
```

```js
// Add syntax highlighting: rehype-pretty-code
import { MDXRemote } from "next-mdx-remote/rsc"

export default function Page() {
  return (
    <MDXRemote
      source={content}
      components={postComponents}
      options={{
        mdxOptions: {
          rehypePlugins: [[rehypePrettyCode, { theme: "github-light" }]],
        },
      }}
    />
  )
}
```

I later found out that the Next.js MDX documentation
also includes a [section](https://nextjs.org/docs/pages/building-your-application/configuring/mdx#remote-mdx) about `next-mdx-remote`.

He was using other packages I haven't heard of. Some I still haven't checked out. This is a good way to learn new stuff I guess. Much better than struggling with bad documentation.

He was also using custom JavaScript to refresh the page when target directory changes. Good stuff.

Previously using package [react-markdown](https://www.npmjs.com/package/react-markdown) was not supporting `js` as code block language, and I had to use full `javascript` like below

> \```javascript````

[rehype-pretty-code](https://www.npmjs.com/package/rehype-pretty-code) supports `js`.

### Packages

- [next-mdx-remote](https://www.npmjs.com/package/next-mdx-remote)
- [rehype-pretty-code](https://www.npmjs.com/package/rehype-pretty-code)
-

### TIL

I don't need to use `.mdx` extension in order to use MDX.

### Todo

- Check out other parts of Dan's code
- Check out how other people do what I already think I know
