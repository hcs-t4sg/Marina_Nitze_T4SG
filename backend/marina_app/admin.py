from django.contrib import admin
from .models import IssueArea, State

class IssueAreaAdmin(admin.ModelAdmin):
    list_display = ('title', 'get_states')

class StateAdmin(admin.ModelAdmin):
    list_display = ('name', 'population','bestPractice1', 'bestPractice2', 'bestPractice3')



# Register your models here.
admin.site.register(IssueArea, IssueAreaAdmin)
admin.site.register(State, StateAdmin)


