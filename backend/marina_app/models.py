from django.db import models

# Create your models here.

# WHEN WE MAKE/CHANGE A MODEL:
#   update admin.py
#   update views.py
#   update serializers.py

class IssueArea(models.Model): # instance example: Adam Walsh? Licensing? -- ask Monica
    title = models.CharField(max_length=200)
    state = models.TextField()
    fee = models.BooleanField(default = False)

    def __str__(self):
        return self.title