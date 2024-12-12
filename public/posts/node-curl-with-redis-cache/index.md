---
title: A Node.js CLI to cache cURL results locally with Redis
date: "2024-12-11"
---

just wanted to use redis locally and came up with this simple idea

assumes node.js and redis are installed on your macos

[github repo](https://github.com/minho42/curl-with-redis-cache)

## usage

```shell
❯ git clone https://github.com/minho42/curl-with-redis-cache.git
❯ cd curl-with-redis-cache
❯ npm i
❯ node index.js https://jsonplaceholder.typicode.com/posts/1
```

## alias

```shell
# ~/.zshrc
# curl0: run curl with local redis cache
alias curl0="node /Users/.../curl-with-redis-cache/index.js"
```

```shell
❯ chmod +x index.js
```

```shell
# use alias
❯ curl0 https://jsonplaceholder.typicode.com/posts/1
```

## make it from scratch

```shell
❯ mkdir curl-with-redis-cache
❯ cd curl-with-redis-cache
❯ npm init -y
❯ touch index.js
```

```json
// edit package.json to use esm
{
  ...
  "type": "module",
  ...
}
```

```js
// index.js
import { createClient } from "redis"
import fetch from "node-fetch"
import { argv } from "process"

const CACHE_TIME = 60 * 60 * 1
const redisUrl = "redis://127.0.0.1:6379"
const client = createClient({ url: redisUrl })
client.on("error", (error) => console.log("redis client error: ", error))

await client.connect()

const args = argv.slice(2)
const url = args[0]

if (!url) {
  console.log("usage: curl0 <url>")
  process.exit(1)
}

function isValidUrl(url) {
  try {
    new URL(url)
    return true
  } catch (error) {
    return false
  }
}

async function fetchWithRedisCache(url) {
  if (!isValidUrl(url)) {
    console.log("error: invalid url")
    process.exit(1)
  }

  try {
    const cachedData = await client.get(url)
    if (cachedData) {
      console.log(cachedData)
      return
    }
    const response = await fetch(url)
    if (!response.ok) {
      console.log("error: http status not ok")
      process.exit(1)
    }

    const data = await response.text()
    client.set(url.trim(), data, {
      EX: CACHE_TIME,
    })
    console.log(data)
  } catch (error) {
    console.log("error fetching the url: ", error.message)
    process.exit(1)
  }
}

async function main() {
  try {
    await fetchWithRedisCache(url)
  } finally {
    await client.quit()
  }
}

await main()
```

```shell
❯ node index.js https://jsonplaceholder.typicode.com/posts/1
```

## some redis commands

```shell
❯ redis-cli ping
PONG

❯ redis-cli
127.0.0.1:6379> dbsize
(integer) 2
127.0.0.1:6379> keys *
1) "key1"
2) "key2"
127.0.0.1:6379> get key1
...
127.0.0.1:6379> flushdb
OK
127.0.0.1:6379> dbsize
(integer) 0
127.0.0.1:6379> exit
```

## note

using a local redis cache doesn't necessarily make it run faster than just using curl
