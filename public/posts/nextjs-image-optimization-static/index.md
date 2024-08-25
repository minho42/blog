---
title: Next.js image optimization for static site
date: "2024-08-25"
---

### Next.js local image optimization for static site

Official Next.js documentation is still not perfect, and doesn't give me the answer I'm looking for.


## config

`next.config.js`

```js
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "export",
  images: {
    unoptimized: true,
    loader: "imgix",
    path: "/",
  },
  trailingSlash: true,
}

module.exports = nextConfig
```

## usage

```tsx
// page.tsx
import Image from "next/image"

<Image
  src={project.image}
  alt={project.name}
  width={120}
  height={120}
/>
```
