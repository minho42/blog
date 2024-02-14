---
title: Overwrite image in Django
date: "2022-04-03"
---

Part of workflow of my side project "Side Project List" (shut down) is:

- Add data manually on local Django app: site url, twitter handle, full name, etc
- **Selenium saves screenshot to local file** `e.g. /media/screenshot/name1`
- Upload to Cloudinary
- ...

### Issue:

Noted same screenshots were saved locally with different names overtime `e.g. name1, name1_abc, name1_xyz, etc`

### Solution:

Make Django overwrite — actually remove and save — instead of saving with new random name


### Before
```python
# project/models.py
class Project(models.Model):
    screenshot = models.ImageField(upload_to="screenshot/", null=True, blank=True)
```

### After
```python
# project/models.py
import os
from django.core.files.storage import FileSystemStorage

class OverwriteStorage(FileSystemStorage):
    def get_available_name(self, name, max_length=None):
        if self.exists(name):
            os.remove(os.path.join(settings.MEDIA_ROOT, name))
        return name


class Project(models.Model):
    screenshot = models.ImageField(upload_to="screenshot/", null=True, blank=True, storage=OverwriteStorage)
```