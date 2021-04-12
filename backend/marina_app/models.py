from django.db import models
from django_mysql.models import ListCharField

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
    num_practices = models.IntegerField(default=7)
    intro_text = models.TextField(default="", null=True, blank=True)
    conclusion_text = models.TextField(default="", null=True, blank=True)

    practice_1 = models.CharField(max_length=200, default="", null=True, blank=True)
    practice_1_question = models.TextField(default="", null=True, blank=True)
    practice_1_description = models.TextField(default="", null=True, blank=True)
    practice_1_quote = models.TextField(default="", null=True, blank=True)
    practice_1_link = models.CharField(max_length=1000, default="", null=True, blank=True)
    subpractices_1_names = ListCharField(base_field =  models.CharField(max_length=200), size=3, max_length = 602, null = True, blank = True)

    practice_2 = models.CharField(max_length=200, default="", null=True, blank=True)
    practice_2_question = models.TextField(default="", null=True, blank=True)
    practice_2_description = models.TextField(default="", null=True, blank=True)
    practice_2_quote = models.TextField(default="", null=True, blank=True)
    practice_2_link = models.CharField(max_length=1000, default="", null=True, blank=True)
    subpractices_2_names = ListCharField(base_field = models.CharField(max_length=200), size=3, max_length = 602, null = True, blank = True)


    practice_3 = models.CharField(max_length=200, default="", null=True, blank=True)
    practice_3_question = models.TextField(default="", null=True, blank=True)
    practice_3_description = models.TextField(default="", null=True, blank=True)
    practice_3_quote = models.TextField(default="", null=True, blank=True)
    practice_3_link = models.CharField(max_length=1000, default="", null=True, blank=True)
    subpractices_3_names = ListCharField(base_field =  models.CharField(max_length=200), size=3, max_length = 602, null = True, blank = True)

    practice_4 = models.CharField(max_length=200, default="", null=True, blank=True)
    practice_4_question = models.TextField(default="", null=True, blank=True)
    practice_4_description = models.TextField(default="", null=True, blank=True)
    practice_4_quote = models.TextField(default="", null=True, blank=True)
    practice_4_link = models.CharField(max_length=1000, default="", null=True, blank=True)
    subpractices_4_names = ListCharField(base_field =  models.CharField(max_length=200), size=3, max_length = 602, null = True, blank = True)

    practice_5 = models.CharField(max_length=200, default="", null=True, blank=True)
    practice_5_question = models.TextField(default="", null=True, blank=True)
    practice_5_description = models.TextField(default="", null=True, blank=True)
    practice_5_quote = models.TextField(default="", null=True, blank=True)
    practice_5_link = models.CharField(max_length=1000, default="", null=True, blank=True)
    subpractices_5_names = ListCharField(base_field =  models.CharField(max_length=200), size=3, max_length = 602, null = True, blank = True)

    practice_6 = models.CharField(max_length=200, default="", null=True, blank=True)
    practice_6_question = models.TextField(default="", null=True, blank=True)
    practice_6_description = models.TextField(default="", null=True, blank=True)
    practice_6_quote = models.TextField(default="", null=True, blank=True)
    practice_6_link = models.CharField(max_length=1000, default="", null=True, blank=True)
    subpractices_6_names = ListCharField(base_field =  models.CharField(max_length=200), size=3, max_length = 602, null = True, blank = True)

    practice_7 = models.CharField(max_length=200, default="", null=True, blank=True)
    practice_7_question = models.TextField(default="", null=True, blank=True)
    practice_7_description = models.TextField(default="", null=True, blank=True)
    practice_7_quote = models.TextField(default="", null=True, blank=True)
    practice_7_link = models.CharField(max_length=1000, default="", null=True, blank=True)
    subpractices_7_names = ListCharField(base_field =  models.CharField(max_length=200), size=3, max_length = 602, null = True, blank = True)


    def __str__(self):
        return self.title


class Implementation(models.Model):
    state = models.ForeignKey(State, on_delete=models.CASCADE)
    issue_area = models.ForeignKey(IssueArea, on_delete=models.CASCADE)

    ImplementationStatuses = [('Implemented','Implemented'),
                              ('Not Implemented','Not Implemented'),
                              ('In Progress', 'In Progress'),
                              ('No Data', 'No Data')]
    practice_1 = models.CharField(max_length=20,  choices = ImplementationStatuses)
    subpractices_1 = ListCharField(base_field = models.CharField(max_length=20,  choices = ImplementationStatuses), size=3, max_length = 63, null = True, blank = True)
    practice_2 = models.CharField(max_length=20, choices = ImplementationStatuses)
    subpractices_2 = ListCharField(base_field = models.CharField(max_length=20,  choices = ImplementationStatuses), size=3, max_length = 63, null = True, blank = True)
    practice_3 = models.CharField(max_length=20, choices = ImplementationStatuses)
    practice_4 = models.CharField(max_length=20, choices = ImplementationStatuses)
    practice_5 = models.CharField(max_length=20, choices = ImplementationStatuses)
    practice_6 = models.CharField(max_length=20, choices = ImplementationStatuses)
    practice_7 = models.CharField(max_length=20, choices = ImplementationStatuses)

    def __str__(self):
        return self.issue_area.title + " " + self.state.name

class Contact(models.Model):
    issue_area = models.ForeignKey(IssueArea, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=200, default="", null=True, blank=True)
    last_name = models.CharField(max_length=200, default="", null=True, blank=True)
    position = models.CharField(max_length=200, default="", null=True, blank=True)
    email = models.CharField(max_length=200, default="", null=True, blank=True)

    
    def __str__(self):
        return self.first_name + " " + self.last_name

