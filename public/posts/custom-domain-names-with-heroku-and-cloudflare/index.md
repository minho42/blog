---
title: Custom domain names with Heroku and Cloudflare
date: "2022-04-25"
---

Provided your app is deployed on Heroku, and domain name bought from Cloudflare

### Setting up DNS while using Heroku for hosting and Cloudflare as DNS provider

### Start

### 1. Heroku

- Login
- Select project
- click `Settings` on the menu
- scroll down to `Domains`

- click `Add domain`

```text
1. Add domain name without www e.g. investingjournals.com
2. Add domain name with www e.g. www.investingjournals.com
```

Copy auto generated `DNS Target` strings from above 2

![Heroku DNS settings](/posts/custom-domain-names-with-heroku-and-cloudflare/heroku-settings-dns.png)

### 2. Cloudflare

- Login
- Select a site
- click `DNS` on the menu
- click `Add record`

```text
1.
Add domain name without www
Type: CNAME
Name: @
Target: computational-waters-vz...

2.
Add domain name with www
Type: CNAME
Name: www
Target: regular-viper-s91fyxmyiai...
```

![Cloudflare DNS settings](/posts/custom-domain-names-with-heroku-and-cloudflare/cloudflare-dns.png)

### End
