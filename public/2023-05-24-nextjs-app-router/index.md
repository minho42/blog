---
title: Next.js 13 App Router migration
date: "2023-05-24"
---

Next.js App Router is stable since 13.4.

Here are some steps I've done to migrate my static blog from pages/ to app/ directory.

[App Router Incremental Adoption Guide](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)

Update next from package.json and package-lock.json

```shell
npm update --save next

# or
npm install next@latest react@latest react-dom@latest
```

Folder structure

```shell
# before
/pages
├── _app.tsx
├── _document.tsx
├── index.tsx
└── posts
    └── [slug].tsx

# after
/app
├── index-page.tsx (Client)
├── layout.tsx (Server)
├── page.tsx (Server)
└── posts
    └── [slug]
        ├── page.tsx (Server)
        └── post-page.tsx (Client)

```

app/layout.tsx (Server Component)

```js
import "../styles/globals.css"
import { Navbar } from "../components/Navbar"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
```

app/page.tsx (Server Component)

```js
// Import your Client Component
import IndexPage from "./index-page"

async function getPosts() {
  const res = await fetch("https://.../posts")
  const posts = await res.json()
  return posts
}

export default async function Page() {
  // Fetch data directly in a Server Component
  const posts = await getPosts()
  // Forward fetched data to your Client Component
  return <IndexPage posts={posts} />
}
```

app/index-page.tsx (Client Component)

```js
"use client";

export default function IndexPage({ posts }) {
  return (
    <div>
      {posts.map((post) => (
        <p>{post.title}<p>
      ))}
    </div>
  );
}
```

Note: If your fetch fails like below in local development, change `localhost` to `127.0.0.1` in your fetch url.

https://github.com/node-fetch/node-fetch/issues/1624

```js
Unhandled Runtime Error
Error: fetch failed

Call Stack
Object.fetch
node:internal/deps/undici/undici (11413:11)
process.processTicksAndRejections
node:internal/process/task_queues (95:5)
```

**getStaticPaths -> generateStaticParams**

app/posts/[slug]/page.tsx (Server Component)

```js
// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const res = await fetch("https://.../posts")
  const posts = await res.json()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default function Page({ params }) {
  const { slug } = params
  // ...
}
```

**getStaticProps -> getProjects (can be named anything)**

app/page.tsx (Server Component) or
app/posts/[slug]/page.tsx (Server Component)

```js
// This function can be named anything
async function getProjects() {
  const res = await fetch(`https://...`)
  const projects = await res.json()

  return projects
}

export default async function Index() {
  const projects = await getProjects()

  return projects.map((project) => <div>{project.name}</div>)
}
```

next.config.js

```js
const nextConfig = {
  output: "export",
}
```

package.json

```json

// before
{
  "build": "next build && next export",
}

// after
{
  "build": "next build",
}
```

Change Cloudflare Pages Build configuration to above.

> "next build",

tailwind.config.js

```js
// before
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}"],
}

// after
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
}
```

Done.
