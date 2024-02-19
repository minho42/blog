---
title: Prevent memory leaks using Selenium
date: "2022-01-09"
---

If you're having zombie chrome processes using selenium, it could be due to failing to quit selenium when uncaught exceptions occur. 

**Use python "context manager" to ensure selenium quits/exits properly**

```python
with Scraper() as s:
    s.fetch()

class Scraper:
    def __init__(self):
        self.driver = get_chromedriver()

    def fetch(self):
        pass

    def __enter__(self):
        return self

    def __exit__(self, *exc):
        if self.driver:
            self.driver.quit()

```
