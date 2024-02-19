---
title: Deploying on Railway and Vercel
date: "2023-06-02"
---

I used to deploy most of my side projects on Heroku free plan.
After Heroku killed the free tier, my side projects became homeless.

Deploying experience I had with Heroku had been great.
It's so sad that Heroku's fame is rapidly declining and people don't recommend Heroku any more.
Paid plans either.

Deploying is really painful experience in the product development cycle in my case.
Making is fun.
But the showing it to others is always a headache.

There are so many options in the deployment.
Services I choose are Railway and Vercel.
No special reasons.
First time user for both.
Haven't tried all the other alternatives, but the overall experiences were good for both.

The project I deployed here is my old side project called _ysk-node_.
YSK (역송금) basically is the first syllables of Korean word that means money transfer.
In this project, I scraped money transfer service companies with their currency exchange rates and fees.
Initially built with Django and Celery.
Then reimplemented with Node.js because async nature of Node.js excelled in scraping multiple sites in parallel.
And Heroku's cold start times differed significantly after sleeping on free plan.
I'm sure you can do async stuff in Python too.
But it's not as easy as in JavaScript.
I once bought a specific domain name for this side project but scraped it after a while.
No one really used this service, I guess, other than me-in-the-past.
So it didn't matter if it's slow or not.

Anyway.
Before I deployed to Railway and Vercel, I made some changes.
Previous version of ysk-node was using MongoDB and Mongoose.
MongoDB and MongoDB Atlas is great but NoSQL is not my favourite.
MongoDB Atlas gives me only 1 free project per account.
I used to make separate gmail account per project.
Too much hassle.
Let's just pay for the service.

For backend,
I choose Railway to host my Node.js/Express app and PostgreSQL.
Prisma for ORM.

For frontend,
I migrated vanilla React app to Next.js using App Router, and hosted on Vercel.

As my project was simple. I didn't have to change much.
Use of MongoDB and Mongoose was very minimal.

Here are some steps I took, things I changed and errors I encountered.

## Prisma

[prisma/.../command-reference](https://www.prisma.io/docs/reference/api-reference/command-reference)

Prisma commands I needed

```shell
npm i -D prisma

npx prisma init --datasource-provider postgresql

npx prisma migrate dev --name init
or
npx prisma db push
```

Note: [prisma db push vs migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate/db-push#choosing-db-push-or-prisma-migrate)

prisma/schema.prisma

```js
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Currency {
  id        Int       @id @default(autoincrement())
  name      String    @unique
  rate      Float     @default(0)
  realRate  Float     @default(0)
  fee       Float     @default(0)
  url       String
  note      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

src/index.ts ([Express & Prisma](https://www.prisma.io/express))

```js
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const data = await prisma.currency.findMany({
  orderBy: [{ realRate: "desc" }, { name: "asc" }],
})
```

src/fetchAll.ts

```js
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

await prisma.currency.upsert({
  where: {
    name: data.name,
  },
  update: {
    rate: data.rate,
    realRate: getRealRate(data.rate, data.fee),
    fee: data.fee,
    url: data.url,
    note: data.note,
  },
  create: {
    name: data.name,
    rate: data.rate,
    realRate: getRealRate(data.rate, data.fee),
    fee: data.fee,
    url: data.url,
    note: data.note,
  },
})
```

Encountered error:

> index.d.ts(xxxx, x): 'create' is declared here.

Cause:
I used upsert without create clause.

```js
// Error: missed create
await prisma.currency.upsert({
  where: {
    ...
  },
  update: {
    ...
  },
});
```

## Node.js

Error:

> TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".ts" for /app/src/index.ts

Fix:

```shell
npm i ts-node
```

package.json

```json
"scripts": {
  "start": "ts-node src/index.ts",
},
```

## Railway

1. New Project -> Provision PostgreSQL

Copy `DATABASE_URL` from:
Select the project -> Connect -> Available Variables -> DATABASE_URL

Paste to `.env`

.env

```js
DATABASE_URL = "postgresql://postgres:abc@app:7864/railway"
```

2. New Project -> ExpressJS

Variables -> New Variable

Add `DATABASE_URL` from above.

## Next.js

frontend/app/page.tsx

```js
import HomePage from "./home-page"

async function getCurrencies() {
  const res = await fetch(".../data", {
    cache: "no-store",
  })
  const data = await res.json()
  return data
}

export default async function Home() {
  const currencies = await getCurrencies()
  return <HomePage currencies={currencies} />
}
```

Error:

In Next.js version 13.4.4, using fetch with `cache: "no-store"` like above along with
static output option of `output: "export"` in next.config.js gave me 404 error without much clue.

Fix:

Remove `output: "export"` from next.config.js

```js
// Before

// frontend/app/page.tsx
const res = await fetch(".../data", {
  cache: "no-store",
})

// next.config.js
const nextConfig = {
  output: "export",
}

// After

// next.config.js
const nextConfig = {
  // output: "export", <- remove this
}
```

## Vercel

Deploy build error:

> error: No Output Directory named "public" found after the Build completed. You can configure the Output Directory in your Project Settings.

Fix:

Select Framework Preset to Next.js

[Project] Settings -> Framework Preset: Next.js
