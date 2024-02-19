---
title: Canonical tag for Next.js (App Router)
date: "2023-12-22"
---

Since I last switched my blog from Next.js Pages Router to App Router in 2023 May,
I didn't have canonical urls for each posts.
It is because the paradigm changed without proper documentation.
At the time, not all documentations were available for App Router, and many often linked back to Pages Router.

I tried to put the canonical urls back.
Eventually I managed to do it but official documentation is still unkind.
It is quite stupid that adding link tag to a page is so difficult.
The fact that meta tag can only be added in server side made it challenging.

Current directory structure of app/

```shell
❯ tree app
app
├── index-page.tsx
├── layout.tsx
├── navbar-page.tsx
├── page.tsx
└── posts
    └── [slug]
        ├── page.tsx (Server Component)
        └── post-page.tsx (Client Component)
```

Add following [generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) function inside `page.tsx`

```js
// app/posts/[slug]/page.tsx
export async function generateMetadata({ params }) {
  return {
    alternates: {
      canonical: `https://minho42.com/posts/${params.slug}`,
    },
  }
}
```

Above code will insert following link tag inside head tag for this post

```html
<head>
  <link rel="canonical" href="https://minho42.com/posts/2023-12-22-canonical-tag-for-nextjs-app" />
</head>
```

#### Related

[Canonical tag for Next.js (Pages Router)](/posts/2022-06-16-canonical-tag-for-nextjs)
