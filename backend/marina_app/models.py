from django.db import models

# Create your models here.

# WHEN WE MAKE/CHANGE A MODEL:
#   update admin.py
#   update views.py
#   update serializers.py
# instance example: Adam Walsh? Licensing? -- ask Monica

class BestPractice(models.Model):
    title = models.CharField(max_length=200)

    def __str__(self):
        return self.title

class State(models.Model):
    name = models.CharField(max_length=200)
    population = models.IntegerField()
    bestPractices = models.ManyToManyField(BestPractice)

    def get_best_practices(self):
        return "\n".join([p.title for p in self.bestPractices.all()])

    def __str__(self):
        return self.name

class IssueArea(models.Model):
    title = models.CharField(max_length=200)
    states = models.ManyToManyField(State)

    def get_states(self):
        return "\n".join([p.states for p in self.states.all()])

    def __str__(self):
        return self.title