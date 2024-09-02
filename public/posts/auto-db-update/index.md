---
title: How to automate local SQLite updates to GitHub using crontab
date: "2024-09-03"
---

Automate updating the local SQLite database to push to GitHub.

1. django
2. celery (sqlite database update)
3. git push to github

# `auto_db_update.sh`

```shell
#!/bin/zsh

cd /Users/minho/code/django/childcare || exit

echo "childcare: auto_db_update.sh"

source .venv/bin/activate

echo "starting django server: childcare"
nohup python3 manage.py runserver 8999 >django.log 2>&1 &
DJANGO_PID=$!

/opt/homebrew/bin/redis-cli config set stop-writes-on-bgsave-error no
if /opt/homebrew/bin/redis-cli ping | grep -q "PONG"; then
    echo "redis is running: 🏓 PONG"

    echo "starting celery worker: childcare"
    nohup celery -A project worker --beat --scheduler django --loglevel=info >celery.log 2>&1 &
    CELERY_PID=$!

    tail -f celery.log &
    TAIL_PID=$!
else
    echo "redis not running, celery will not start"
    exit 1
fi

sleep 30

echo "committing changes..."
git add db.sqlite3
git commit -m "$(date '+%Y-%m-%d:%H:%M:%S-auto-db-update')"
git push

echo "cleaning up logs..."
/opt/homebrew/bin/trash django.log celery.log

echo "terminating processes..."
# kill $DJANGO_PID
# kill $CELERY_PID
# kill $TAIL_PID

if [ -n "$DJANGO_PID" ] && ps -p $DJANGO_PID >/dev/null; then
    echo "Terminating Django process with PID: $DJANGO_PID"
    kill $DJANGO_PID
else
    echo "Django process with PID $DJANGO_PID is not running"
fi

if [ -n "$CELERY_PID" ] && ps -p $CELERY_PID >/dev/null; then
    echo "Terminating Celery process with PID: $CELERY_PID"
    kill $CELERY_PID
else
    echo "Celery process with PID $CELERY_PID is not running"
fi

if [ -n "$TAIL_PID" ] && ps -p $TAIL_PID >/dev/null; then
    echo "Terminating tail process with PID: $TAIL_PID"
    kill $TAIL_PID
else
    echo "Tail process with PID $TAIL_PID is not running"
fi

echo "done"

```

```shell
❯ crontab -e
```

```shell
# Run the script every day at midnight
0 0 * * * /Users/minho/code/django/childcare/auto_db_update.sh
```

# Errors encountered

## 1. Command not found

Although the script was running as the same current user (`whoami`), some commands were not executing properly as it didn't find the path.

```shell
# use full path

# before
redis-cli
trash

# after
/opt/homebrew/bin/redis-cli
/opt/homebrew/bin/trash
```

```shell
# find the full path

❯ which redis-cli
/opt/homebrew/bin/redis-cli

❯ which trash
/opt/homebrew/bin/trash
```

## 2. GitHub access error

Error message from the `mail`

```shell
fatal: could not read Username for 'https://github.com': Device not configured
```

### Fix: use ssh instead of https to access

```shell
❯ git remote set-url origin git@github.com:minho42/childcare.git
```

Above command will change the `[remote "origin"] url` in the config like so

```shell
❯ git remote -v
origin	git@github.com:minho42/childcare.git (fetch)
origin	git@github.com:minho42/childcare.git (push)
```

```shell
❯ cat .git/config

# Before: https

[remote "origin"]
	url = https://github.com/minho42/childcare.git
	fetch = +refs/heads/*:refs/remotes/origin/*

# After: ssh

[remote "origin"]
	url = git@github.com:minho42/childcare.git
	fetch = +refs/heads/*:refs/remotes/origin/*
```

### Note: ssh to be set locally and on github for above to work

```shell
# if these are not done already

# make ssh keys
❯ ssh-keygen -t ed25519 -C "minho42@gmail.com"

# set content of this on github: Settings -> SSH and GPG keys -> New SSH key
❯ cat ~/.ssh/id_ed25519.pub
ssh-ed25519 AA... minho42@gmail.com

# check if it works
❯ ssh -T git@github.com
Hi minho42! You've successfully authenticated, but GitHub does not provide shell access.
```
