from django.db import models

# Create your models here.

# WHEN WE MAKE/CHANGE A MODEL, UPDATE:
#   admin.py
#   views.py
#   serializers.py
#   urls.py

class State(models.Model):
    name = models.CharField(max_length=200)
    abbreviation = models.CharField(max_length = 3, default = "")
    population = models.IntegerField()

    electronic_request = models.BooleanField(default = False)
    no_notary_required = models.BooleanField(default = False)
    no_fee = models.BooleanField(default = False)
    no_contact = models.BooleanField(default = False)
    no_witness_required = models.BooleanField(default = False)

    county_administered = models.BooleanField(default = False)

    def __str__(self):
        return self.name

class IssueArea(models.Model):
    title = models.CharField(max_length=200)
    states = models.ManyToManyField(State)

    def get_states(self):
        return "\n".join([p.name for p in self.states.all()])

    def __str__(self):
        return self.title

class ImplementationGuidance(models.Model):
    name = models.CharField(max_length=200)
    question = models.TextField()
    why = models.TextField()
    quote = models.TextField()
    link = models.URLField(max_length=200)


    def __str__(self):
        return self.name