---
title: Shell aliases for Django
date: "2022-03-07"
---

My .zshrc aliases for Django

```shell
alias runserver="python manage.py runserver"

alias makemigrations="python manage.py makemigrations"

alias migrate="python manage.py migrate"

alias collectstatic="python manage.py collectstatic"

# pip install django-extensions [ipython]
alias shellplus="python manage.py shell_plus [--ipython]"

```