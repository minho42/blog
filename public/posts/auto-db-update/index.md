---
title: Automate local SQLite updates to GitHub
date: "2024-08-29"
---

Automate updating the local SQLite database to push to GitHub.

> Note: I'm not very sure if this works well so far.

1. django
2. celery
3. sqlite database update
4. git push to github

`auto_db_update.sh`

```shell
#!/bin/zsh

cd /Users/minho/code/django/project || exit

echo "auto_db_update.sh"

source .venv/bin/activate

echo "starting django server: project"
nohup python3 manage.py runserver >django.log 2>&1 &
DJANGO_PID=$!

if redis-cli ping | grep -q "PONG"; then
    echo "redis is running: 🏓 PONG"

    echo "starting celery worker: project"
    nohup celery -A project worker --beat --scheduler django --loglevel=info >celery.log 2>&1 &
    CELERY_PID=$!

    tail -f celery.log &
    TAIL_PID=$!
else
    echo "redis not running, celery will not start"
    exit 1
fi

# sleep time to be adjusted...
sleep 40

echo "committing changes..."
git add db.sqlite3
git commit -m "$(date '+%Y-%m-%d:%H:%M:%S-auto-db-update')"
git push

echo "cleaning up logs..."
trash django.log celery.log

echo "terminating processes..."
kill $DJANGO_PID
kill $CELERY_PID
kill $TAIL_PID

echo "done"

```

```shell
crontab -e
```

```shell
# Run the script every Monday, Wednesday, and Friday at midnight
0 0 * * 1,3,5 /Users/minho/code/django/project/auto_db_update.sh
```
