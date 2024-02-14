---
title: Next.js deploy settings on Netlify for this blog
date: "2022-09-23"
---

package.json

```json
"scripts": {
  "build": "next build && next export",
}
```

next.config.js

```js
eslint: {
  ignoreDuringBuilds: true,
},
```

1. Netlify: Deploys -> Deploy settings -> Build settings

```build_settings
    Base directory:
    Build command: next build && next export
    Publish directory: out
```

2. Site settings -> Build & deploy -> Environment -> Environment variables

```environment_variables
    Key: NETLIFY_NEXT_PLUGIN_SKIP
    Value: true
```
