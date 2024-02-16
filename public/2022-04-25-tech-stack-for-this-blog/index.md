---
title: Tech stack for this blog
date: "2022-04-25"
---

[https://github.com/minho42/blog](https://github.com/minho42/blog)

### Frontend

- Next.js

  Initially started with:

  - Evolved from this tutorial [Static Blog With Next.js and Markdown](https://youtu.be/MrjeefD8sac) by [Brad Traversy](https://twitter.com/traversymedia)
  - gray-matter
  - react-markdown
  - react-syntax-highlighter

  Changed:

  - Added [MDX](/posts/2024-02-13-mdx) from Dan's blog [repo](https://github.com/gaearon/overreacted.io)
  - next-mdx-remote
  - rehype-pretty-code

### CSS

- Tailwind CSS
  - @tailwindcss/typography ([post](/posts/2022-04-26-why-react-with-tailwind-didn't-render-markdown))

### Deployment

- ~~Netlify~~ -> Cloudflare Pages ([post](/posts/2022-11-30-cloudflare-pages))

### Etc

- Domain: Cloudflare
- GitHub
- VS Code

  - [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)

    ```json
    settings.json

    "cSpell.language": "en-GB"
    ```
