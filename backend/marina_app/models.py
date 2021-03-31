from django.db import models

# Create your models here.

# WHEN WE MAKE/CHANGE A MODEL, UPDATE:
#   admin.py
#   views.py
#   serializers.py
#   urls.py

class State(models.Model):
    name = models.CharField(max_length=200, primary_key=True)
    abbreviation = models.CharField(max_length = 3, default = "")
    population = models.IntegerField()
    county_administered = models.BooleanField(default = False)

    def __str__(self):
        return self.name

class IssueArea(models.Model):
    title = models.CharField(max_length=200, primary_key=True)
    intro_text = models.TextField(default="")
    conclusion_text = models.TextField(default="")

    practice_1 = models.CharField(max_length=200, default="")
    practice_1_description = models.TextField(default="")

    practice_2 = models.CharField(max_length=200, default="")
    practice_2_description = models.TextField(default="")

    practice_3 = models.CharField(max_length=200, default="")
    practice_3_description = models.TextField(default="")

    practice_4 = models.CharField(max_length=200, default="")
    practice_4_description = models.TextField(default="")

    practice_5 = models.CharField(max_length=200, default="")
    practice_5_description = models.TextField(default="")

    practice_6 = models.CharField(max_length=200, default="")
    practice_6_description = models.TextField(default="")

    practice_7 = models.CharField(max_length=200, default="")
    practice_7_description = models.TextField(default="")

    def __str__(self):
        return self.title

class Implementation(models.Model):
    state = models.ForeignKey(State, on_delete=models.CASCADE)
    issue_area = models.ForeignKey(IssueArea, on_delete=models.CASCADE)
    practice_1 = models.BooleanField(default = None)
    practice_2 = models.BooleanField(default = None)
    practice_3 = models.BooleanField(default = None)
    practice_4 = models.BooleanField(default = None)
    practice_5 = models.BooleanField(default = None)
    practice_6 = models.BooleanField(default = None)
    practice_7 = models.BooleanField(default = None)

    def __str__(self):
        return self.issue_area.title + " " + self.state.name
