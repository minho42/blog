---
title: Tried SwiftData
date: "2024-11-13"
---

I have used SQLite for local data storage for pretty much all of my previous iOS apps.
I have been meaning to try out SwiftData, and did so in my recent iOS project, [Recycle](/posts/new-app-recycle).

I'm working on my next project, CXR, and tried to use SwiftData again.
This project has about 50K+ image metadata in a bundled file.
I tried to migrate this data from [csv, json, SQLite] to SwiftData but it didn't work at this stage.
It turns out, SwiftData doesn't handle large datasets well.
In this case, it couldn't handle up to 40K records.
Therefore, I'm switching back to SQLite for this next project.

Pros:

- Shorter/simpler code
- Like the use of @Model

Cons:

- Can't handle large amounts of data
- Lots of warnings/errors re: unsupported data types, e.g., array?
- Need to reset simulator when SwiftData model changes, etc
