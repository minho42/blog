---
title: Upgrade Next.js to 14
date: "2023-12-24"
---

Upgraded Next.js from 13 to 14.
Below are two changes I made.

[v14 Summary](https://nextjs.org/docs/pages/building-your-application/upgrading/version-14#v14-summary)

#### The minimum Node.js version has been bumped from 16.14 to 18.17

Changed Cloudflare default Node.js version to my current local version of 20.9.0.

Cloudflare: Workers & Pages -> [blog] -> Settings -> Environment variables

```shell
# Before
NODE_VERSION: 16.15.0

# After
NODE_VERSION: 20.9.0
```

#### The next export command is deprecated in favor of output: 'export'

Removed "next export" from build command.

Cloudflare: Workers & Pages -> [blog] -> Settings -> Build & deployments

```shell
# Before
Build command: next build && next export

# After
Build command: next build
```

---

Things previously done when upgrading to 13 that is also required in 14:

```js
// next.config.js

const nextConfig = {
  output: "export",
}
```

```json
// package.json

// before
{
  "build": "next build && next export",
}

// after
{
  "build": "next build",
}
```
