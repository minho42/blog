---
title: Share Heroku PostgreSQL database locally
date: "2022-06-02"
---

### My use case

I have a python script that works on localhost but fails on heroku. I have no problem running it manually every time I need to update the database, but I need to be able to check the results when I'm outside.

### Solution, for now
 
Solution I came up with so far is to use heroku postgres database locally as well.

This is what I've been doing with mongodb atlas for some of my other projects.

### Steps

Add heroku add-on: `Heroku Postgres` on heroku website

or 

```shell
heroku addons:create heroku-postgresql
```

This generates environment variable `DATABASE_URL` on heroku

Check the value on heroku website

Settings > `Reveal Config Vars`

or 

```shell
heroku config:get DATABASE_URL
```

```shell
pip install dj-database-url
```

settings.py (settings/base.py in my case)
```python
import dj_database_url
import environ

env = environ.Env(DEBUG=(bool, False))
environ.Env.read_env()

DATABASES = {}
DATABASES["default"] = dj_database_url.config(
    default=env("DATABASE_URL"), 
    conn_max_age=600, ssl_require=True)
```

I use Postico/TablePlus to connect to this database by it's url.

That's it. Now I'm sharing heroku postgresql database locally.
