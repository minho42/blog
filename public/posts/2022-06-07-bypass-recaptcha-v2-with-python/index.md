---
title: Bypass reCAPTCHA v2 with Python
date: "2022-06-07"
---

### Background

Buying gift cards online saves me 3-5% for grocery shopping in Australia.
There are 2 big players in the scene: Woolworths and Coles.

Woolworths has 'Woolworths Money App' that updates gift card balance automatically once registered.

vs

Coles has [website](https://www.giftcards.com.au/checkbalance) where you can check gift card balance after entering 16-20 digit card number, PIN, and proof of not being a robot "every time". Yes, you repeat this for each card.

Keeping track of coles gift card balance is non trivial. I have been meaning to make this process automated, but failed to bypass reCAPTCHA repeatedly. It is a reCAPTCHA version 2, something you just need to click to prove your bot-less-ness.

### Past tries

I have tried to bypass reCAPTCHA this coles balance checking site with puppeteer (Node.js) and Selenium (Python) without success in the past. Unsure if this was due to not following all the steps mentioned below...

### Bypassed successfully

Became aware of new testing tool Playwright that is an alternative to puppeteer/selenium.

So I tried again, and this time it worked, although more often than not it still fails to bypass and asks to select images. I consider this a win for me as I can just manually select images for checking my gift card balances. Traking cards and typing would be done effortlessly.

Made a simple django app on top of the scraping script.
https://github.com/minho42/coles

Below python snippet shows how reCAPTCHA version 2 can be bypassed.

### Steps took to get it working:

1. headless browser with headless mode off 🥲

```python
browser = p.chromium.launch(headless=False)
```

It fails when headless is set to True. Sometimes it fails to bypass and need human interaction therefore needing `headless=False` again

2. change `navigator.webdriver` value to `false`

```js
// Try when Playwright is started in REPL
> navigator.webdriver
  true
```

```js
// Assigning false value doesn't work
> navigator.webdriver = false
> navigator.webdriver
  true
```

```js
// This works
> Object.defineProperty(navigator, 'webdriver',
{ get: () => false })

> navigator.webdriver
  false
```

3. scroll to "I'm not a robot" checkbox

```js
document.querySelector("...").scrollIntoView()
```

### To do

More ways to avoid headless browser detection needs to be tried.

### Side note

Tried same code with Playwright in Node.js, but kept failing without a single success for some reason.

[Playwright for Python](https://playwright.dev/python/docs/api/class-playwright)

### Code snippet

From my [coles gift card tracker app](https://github.com/minho42/coles)

```python
from playwright.sync_api import sync_playwright

card_number = "1234567890"
pin = "1234"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    page = browser.new_page()
    page.goto("https://www.giftcards.com.au/checkbalance")
    page.wait_for_selector('iframe[title="reCAPTCHA"]')

    page.fill("input#cardNumber", card_number)
    page.fill("input#cardPIN", pin)
    page.evaluate("document.querySelector('input#cardPIN').scrollIntoView();")
    page.frame_locator('iframe[title="reCAPTCHA"]').locator(".recaptcha-checkbox-border").click()
    page.wait_for_timeout(2000)

    # Bypass headless chrome detection
    page.evaluate("Object.defineProperty(navigator, 'webdriver', { get: () => false });")
    webdriver = page.evaluate("navigator.webdriver")
    assert not webdriver, "navigator.webdriver not changed to false"

    page.locator("form#cbForm button").click()

    page.wait_for_selector(".gift-card-summary__rowBorder td")
    balance = page.query_selector(".gift-card-summary__rowBorder td").inner_text()
    print(balance)
    browser.close()
```
