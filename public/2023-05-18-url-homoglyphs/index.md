---
title: Homoglyph slashes in URL
date: "2023-05-18"
---

Read a blog post, [The Dangers of Google’s .zip TLD](https://medium.com/@bobbyrsec/the-dangers-of-googles-zip-tld-5e1e675e59a5), 
from [@bobbyrsec](https://twitter.com/bobbyrsec)

### TIL: "@" and "/" in URL redirection

[URI on Wikipedia](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier#Example_URIs)

```shell
        userinfo   host  port
        ┌──┴──┐ ┌───┴──┐ ┌┴┐
https://user.pw@host.com:123
└─┬─┘   └─────────┬────────┘
scheme      authority           
  
```

### Redirect examples

URL with @ operator: redirect to what comes after "@"

```shell
# URL with @ operator
https://google.com@bing.com 
        └───┬────┘ └───┬──┘
         userinfo     host

-> bing.com
```

```shell
# URL with @ operator, malicious intent
https://legit.com@evil.com
        └───┬───┘ └───┬──┘
         userinfo    host

-> evil.com 💀
```

[Semantic attack](https://www.rfc-editor.org/rfc/rfc3986#section-7.6:~:text=ftp%3A//cnn.example.com%26story%3Dbreaking_news%4010.0.0.1/top_story.htm%0A%0A%20%20%20might%20lead%20a%20human%20user%20to%20assume%20that%20the%20host%20is%20%27cnn.example.com%27%2C%0A%20%20%20whereas%20it%20is%20actually%20%2710.0.0.1%27.) example

```shell
ftp://cnn.example.com&story=breaking_news@10.0.0.1/top_story.htm
```

✅ Legitimate slash: 
- / [U+002F]


❌ [Homoglyph slashs](https://en.wiktionary.org/wiki//): 
- ⁄ [U+2044]
- ∕ [U+2215]
- ／ [U+FF0F]
- ⧸ [U+29F8]

Slash before "@" doesn't redirect to what comes after "@", 
but homoglyph slashes will redirect to what comes after "@".

```shell
                ✅ / [U+002F]
                 ┌┴┐
https://google.com/search@bing.com
        └───────┬───────┘
           NOT userinfo

-> google.com
```

```shell
                ❌ ∕ [U+2215]
                 ┌┴┐
https://google.com∕search@bing.com 
        └───────┬───────┘ └───┬──┘
             userinfo        host
             
-> bing.com 💀
```
