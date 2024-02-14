---
title: Django middleware example
date: "2022-01-10"
---

my use case: 
get latest visiting time from a user, not a login time

/profiles/models.py
```python
class User(AbstractUser):
    last_visit = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    ...
```

/projectname/middleware.py

```python
from django.utils import timezone
from profiles.models import User
from datetime import timedelta

# https://docs.djangoproject.com/en/dev/topics/http/middleware/#writing-your-own-middleware
class LastVisitMiddleware:
    def __init__(self, get_response):
        # One-time configuration and initialization.

        self.get_response = get_response

    def __call__(self, request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.

        response = self.get_response(request)

        # Code to be executed for each request/response after
        # the view is called.

        if request.user.is_authenticated:
            try:
                last_visit = User.objects.get(pk=request.user.pk).last_visit
                if last_visit + timedelta(minutes=1) < timezone.now():
                    User.objects.filter(pk=request.user.pk).update(
                        last_visit=timezone.now()
                    )
            except User.DoesNotExist:
                pass

        return response
```

/settings.py
```python
MIDDLEWARE = [
    ...
    ...    
    "projectname.middleware.LastVisitMiddleware",
]
```
