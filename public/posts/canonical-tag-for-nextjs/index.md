---
title: Canonical tag for Next.js (Pages Router)
date: "2022-06-16"
---

I'm planning to cross-post my blog posts to other tech blogging platforms e.g. dev.to, hashnode, etc in order to increase visibility and my web presence.

Cross-posting would make my articles duplicate over the Internet. That's bad for SEO.

To avoid this, I need to point which article is the "original" by setting a `canonical tag`.

As a non-native English speaker, I've heard of the word "canonical" many times before, but never really understood what it means. Searching from dictionaries didn't help much.

It just means the "original", kind of "source of truth" that Google or other browser crawlers can see if needs "indexing".

During the research of this canonical url, I learned that even slightest differences in the url can make my article duplicate e.g. www vs non-www, http vs https, extra parameters at the end of the urls, etc.

Therefore, having a canonical url for each post is very important even if I don't intend to cross-post.

Canonical url looks like this in plain html

```html
<head>
  <link rel="canonical" href="https://minho42.com/post1" />
</head>
```

In my Next.js app (Pages Router), above changes like so

pages/posts/[slug].js

```js
import Head from "next/head"
import { useRouter } from "next/router"

export default function PostPage() {
  const router = useRouter()
  const canonicalUrl = `https://minho42.com${router.asPath}`

  return (
    <Head>
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  )
}
```

#### Related

[Canonical tag for Next.js (App Router)](/posts/canonical-tag-for-nextjs-app)
