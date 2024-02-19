---
title: Next.js sitemap
date: "2022-10-22"
---

Found out that my posts were not indexed by Google.

Search with `site:https://minho42.com` didn't show all posts but only few pages.

Confirmed above with URL inspection from Google Search Console

Here's how I generate a sitemap for this blog (Next.js on ~~Netlify~~ Cloudflare) using [next-sitemap](https://github.com/iamvishnusankar/next-sitemap)

```shell
npm i -D next-sitemap
```

```shell
touch next-sitemap.config.js
```

Paste below to `next-sitemap.config.js`

```js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://example.com",
  generateRobotsTxt: true, // (optional)
  // ...other options
}
```

Adding postbuild command to `package.json` worked locally

```json
"scripts": {
  ...
  "build": "next build && next export",
  "postbuild": "next-sitemap",
  ...
},
```

and generated following files in `/public/`

- robots.txt
- sitemap.xml
- sitemap-0.xml

However, this didn't work on Netlify as is, and an easy way to fix this was just to add the above `postbuild` command inside the `build` command like so

```json
"scripts": {
	...
  "build": "next build && next-sitemap && next export",
  ...
}
```

> ### Note
>
> If you are using Cloudflare Pages,
> make sure to change `Settings/Builds & deployments/Build configuration` as above build script instead of preset build command Cloudflare gives you when you select `Framework preset: Next.js (Static HTML Export)`

Done.
