---
title: How to use typescript in existing Next.js project
date: "2022-04-30"
---

Well typescript has won.
You probably need to use it if you're working in a team.
I'm a solo hobby developer.
But I still have a slim chance that I want to change my career.
Let's change my project to typescript.

### Get started

Create typescript config file

```shell
touch tsconfig.json
```

It creates `tsconfig.json` file. It's empty but don't worry.

### Install packages

```shell
npm i -D typescript [@types/react @types/node]
```

### Run the Next.js project

```shell
npm run dev
```

```shell
npm run

> dev
> next dev

ready - started server on 0.0.0.0:3000, url: http://localhost:3000
We detected TypeScript in your project and created a tsconfig.json file for you.
```

Next.js fills `tsconfig.json` for you.

> If you're not using Next.js, following command will create > and fill the `tsconfig.json` file
>
> ```shell
> tsc --init
> ```

### Change file names

Change file names from `*.js` to `*.tsx`

### Now you're using typescript

More to be added as I gradually convert to typescript...

Before

```js
...
```

After

```typescript
...
```
