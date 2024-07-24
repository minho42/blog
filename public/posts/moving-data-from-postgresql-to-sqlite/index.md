---
title: Moving Django Data from PostgreSQL to SQLite
date: "2024-07-24"
---

How I migrated Django project data from PostgreSQL to SQLite

### Dump PostgreSQL data

```shell
python manage.py dumpdata app_name > data_dump.json
```

### Change database from PostgreSQL to SQLite in settings.py

```python
# settings.py

# before
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "app_name",
        "USER": env("DATABASE_USER"),
        "PASSWORD": env("DATABASE_PASSWORD"),
        "HOST": "127.0.0.1",
        "PORT": "5432",
    }
}

# after
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}
```

### Comment out signals if you don't want them to be triggered

```python
# @receiver(post_save, sender=App) <-- here
def app_post_save(sender, instance, created, **kwargs):
	...
```

### Load data to SQLite

```shell
python manage.py loaddata data_dump.json
```
