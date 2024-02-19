---
title: Next.js hydration error
date: "2022-11-29"
---

Just encountered `React Hydration Error` while using Next.js

> Unhandled Runtime Error
>
> Error: Hydration failed because the initial UI does not match what was rendered on the server.

> Unhandled Runtime Error
>
> Error: There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering.

Above error messages are unintuitive and call stack traces don't give much clue where the source of error is.

[#35773](https://github.com/vercel/next.js/discussions/35773): some fixes are shared in the github discussion

[React Hydration Error](https://nextjs.org/docs/messages/react-hydration-error): this link shows possible fix but still not very helpful

In my case, the cause was from an invalid HTML: missing tr tag in table

> Invalid HTML may cause hydration mismatch such as div inside p.

Here are more examples of `invalid HTML` that could break Next.js hydration

### Invalid tags inside \<p>

\<div> inside \<p>

\<p> inside \<p>

\<h1> inside \<p>

\<li> inside \<p>

...

### Incomplete \<table> tag

\<table> without either \<thead> or \<tbody>

\<table> with missing \<tr>

...
