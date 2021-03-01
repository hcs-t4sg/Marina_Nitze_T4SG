from django.db import models

# Create your models here.

# WHEN WE MAKE/CHANGE A MODEL, UPDATE:
#   admin.py
#   views.py
#   serializers.py
#   urls.py

class State(models.Model):
    name = models.CharField(max_length=200)
    population = models.IntegerField()
    bestPractice1 = models.BooleanField(default = False)
    bestPractice2 = models.BooleanField(default = False)
    bestPractice3 = models.IntegerField(default = 0)

    def __str__(self):
        return self.name

class IssueArea(models.Model):
    title = models.CharField(max_length=200)
    states = models.ManyToManyField(State)

    def get_states(self):
        return "\n".join([p.name for p in self.states.all()])

    def __str__(self):
        return self.title