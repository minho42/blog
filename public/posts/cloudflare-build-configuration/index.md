---
title: Cloudflare Pages Build configuration
date: "2023-01-11"
---

Found out my `sitemap.xml` link was broken.

It turns out build script on Cloudflare was set to "Framework preset: Next.js (Static HTML Export)" which didn't include my custom step, "next-sitemap", in the build process.

```json
// Before
"build": "next build && next export",
```

Okay.
"Settings/Builds & deployments/Build configuration" has been changed and deployed.

```json
// After
"build": "next build && next-sitemap && next export",
```

> Checkout how I did it with [next-sitemap](/posts/nextjs-sitemap)

Deployment failed with following error messages.

```shell
...
10:13:14.807
10:13:14.981	(node:1446) ExperimentalWarning: The ESM module loader is experimental.
10:13:14.993	file:///opt/buildhome/repo/node_modules/next-sitemap/dist/esm/cli.js:31
10:13:14.993	        if (config?.generateRobotsTxt) {
10:13:14.993	                   ^
10:13:14.993
10:13:14.993	SyntaxError: Unexpected token '.'
10:13:14.994	    at Loader.moduleStrategy (internal/modules/esm/translators.js:81:18)
10:13:14.999	Failed: build command exited with code: 1
10:13:16.160	Failed: an internal error occurred
```

[Stack Overflow search](https://stackoverflow.com/a/64077461/4866594) showed this problem has been solved since Node version 14.12.

Doesn't Cloudflare support recent Node versions?
Thought about going back to Netlify for a while.
Turns out you can change the default versions of languages that run on Cloudflare ([Cloudflare Pages Build-configuration](https://developers.cloudflare.com/pages/platform/build-configuration/)).
Of course you can.

Default version of Node.js is 12.18.0 as of this writing.
I changed this to my current local Node.js version of 16.15.0.

```shell
Settings/Environment variables

NODE_VERSION: 16.15.0
```

Done.
