from django.db import models
from django_mysql.models import ListCharField

# Create your models here.

# WHEN WE MAKE/CHANGE A MODEL, UPDATE:
#   admin.py
#   views.py
#   serializers.py
#   urls.py

class State(models.Model):
    name = models.CharField(max_length=50, primary_key=True)
    abbreviation = models.CharField(max_length = 3, default = "")
    population = models.IntegerField()
    county_administered = models.BooleanField(default = False)

    def __str__(self):
        return self.name

class IssueArea(models.Model):
    title = models.CharField(max_length=100, primary_key=True)
    num_practices = models.IntegerField(default=7)
    intro_text = models.TextField(default="", null=True, blank=True)
    conclusion_text = models.TextField(default="", null=True, blank=True)

    practice_1 = models.CharField(max_length=100, default="", null=True, blank=True)
    practice_1_question = models.TextField(default="", null=True, blank=True)
    practice_1_description = models.TextField(default="", null=True, blank=True)
    practice_1_quote = models.TextField(default="", null=True, blank=True)
    practice_1_link = models.CharField(max_length=200, default="", null=True, blank=True)
    # num_subpractices_1 = models.IntegerField(default = 0)
    # subpractices_1_names = ListCharField(base_field =  models.CharField(max_length=100), size=3, max_length = 302, null = True, blank = True)

    practice_2 = models.CharField(max_length=100, default="", null=True, blank=True)
    practice_2_question = models.TextField(default="", null=True, blank=True)
    practice_2_description = models.TextField(default="", null=True, blank=True)
    practice_2_quote = models.TextField(default="", null=True, blank=True)
    practice_2_link = models.CharField(max_length=200, default="", null=True, blank=True)
    # num_subpractices_2 = models.IntegerField(default = 0)
    # subpractices_2_names = ListCharField(base_field =  models.CharField(max_length=100), size=3, max_length = 302, null = True, blank = True)


    practice_3 = models.CharField(max_length=100, default="", null=True, blank=True)
    practice_3_question = models.TextField(default="", null=True, blank=True)
    practice_3_description = models.TextField(default="", null=True, blank=True)
    practice_3_quote = models.TextField(default="", null=True, blank=True)
    practice_3_link = models.CharField(max_length=200, default="", null=True, blank=True)
    # num_subpractices_3 = models.IntegerField(default = 0)
    # subpractices_3_names = ListCharField(base_field =  models.CharField(max_length=100), size=3, max_length = 302, null = True, blank = True)

    practice_4 = models.CharField(max_length=100, default="", null=True, blank=True)
    practice_4_question = models.TextField(default="", null=True, blank=True)
    practice_4_description = models.TextField(default="", null=True, blank=True)
    practice_4_quote = models.TextField(default="", null=True, blank=True)
    practice_4_link = models.CharField(max_length=200, default="", null=True, blank=True)
    # num_subpractices_4 = models.IntegerField(default = 0)
    # subpractices_4_names = ListCharField(base_field =  models.CharField(max_length=100), size=3, max_length = 302, null = True, blank = True)

    practice_5 = models.CharField(max_length=100, default="", null=True, blank=True)
    practice_5_question = models.TextField(default="", null=True, blank=True)
    practice_5_description = models.TextField(default="", null=True, blank=True)
    practice_5_quote = models.TextField(default="", null=True, blank=True)
    practice_5_link = models.CharField(max_length=200, default="", null=True, blank=True)
    # num_subpractices_5 = models.IntegerField(default = 0)
    # subpractices_5_names = ListCharField(base_field =  models.CharField(max_length=100), size=3, max_length = 302, null = True, blank = True)

    practice_6 = models.CharField(max_length=100, default="", null=True, blank=True)
    practice_6_question = models.TextField(default="", null=True, blank=True)
    practice_6_description = models.TextField(default="", null=True, blank=True)
    practice_6_quote = models.TextField(default="", null=True, blank=True)
    practice_6_link = models.CharField(max_length=200, default="", null=True, blank=True)
    # num_subpractices_6 = models.IntegerField(default = 0)
    # subpractices_6_names = ListCharField(base_field =  models.CharField(max_length=100), size=3, max_length = 302, null = True, blank = True)

    practice_7 = models.CharField(max_length=100, default="", null=True, blank=True)
    practice_7_question = models.TextField(default="", null=True, blank=True)
    practice_7_description = models.TextField(default="", null=True, blank=True)
    practice_7_quote = models.TextField(default="", null=True, blank=True)
    practice_7_link = models.CharField(max_length=200, default="", null=True, blank=True)
    # num_subpractices_7 = models.IntegerField(default = 0)
    # subpractices_7_names = ListCharField(base_field =  models.CharField(max_length=100), size=3, max_length = 302, null = True, blank = True)


    def __str__(self):
        return self.title


class Implementation(models.Model):
    state = models.ForeignKey(State, on_delete=models.CASCADE)
    issue_area = models.ForeignKey(IssueArea, on_delete=models.CASCADE)


    practice_1 = models.BooleanField(null=True)
    # subpractices_1 = ListCharField(base_field = models.BooleanField(null=True), size=3, null = True, blank = True)
    practice_2 = models.BooleanField(null=True)
    # subpractices_2 = ListCharField(base_field = models.CharField(max_length=5,  choices = Status_Choices), size=3, max_length = 6*3, null = True, blank = True)    
    practice_3 = models.BooleanField(null=True)
    # subpractices_3 = ListCharField(base_field = models.CharField(max_length=5,  choices = Status_Choices), size=3, max_length = 6*3, null = True, blank = True)
    practice_4 = models.BooleanField(null=True)
    # subpractices_4 = ListCharField(base_field = models.CharField(max_length=5,  choices = Status_Choices), size=3, max_length = 6*3, null = True, blank = True)
    practice_5 = models.BooleanField(null=True)
    # subpractices_5 = ListCharField(base_field = models.CharField(max_length=5,  choices = Status_Choices), size=3, max_length = 6*3, null = True, blank = True)
    practice_6 = models.BooleanField(null=True)
    # subpractices_6 = ListCharField(base_field = models.CharField(max_length=5,  choices = Status_Choices), size=3, max_length = 6*3, null = True, blank = True)
    practice_7 = models.BooleanField(null=True)
    # subpractices_7 = ListCharField(base_field = models.CharField(max_length=5,  choices = Status_Choices), size=3, max_length = 6*3, null = True, blank = True)


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

class AboutUs(models.Model):
    title = models.CharField(max_length=200, default="", null=True, blank=True)
    body = models.CharField(max_length=200, default="", null=True, blank=True)

    
    def __str__(self):
        return self.title

