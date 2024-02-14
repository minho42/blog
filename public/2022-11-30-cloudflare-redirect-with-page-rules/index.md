---
title: Cloudflare redirect with Page Rules
date: "2022-11-30"
---

Redirecting www url to non-www on Cloudflare using Page Rules.

`Home` -> select site `minho42.com` -> `Rules` from left menu -> `Page Rules` -> `Create page Rule`

```text
URL (required): www.minho42.com/*
Pick a Setting (required): Forwarding URL
Select status code (required): 301 - Permanent Redirect
Enter destination URL (required): https://minho42.com/$1
```
