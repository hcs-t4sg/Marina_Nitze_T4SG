from django.contrib import admin
from .models import IssueArea, BestPractice, State

class IssueAreaAdmin(admin.ModelAdmin):
    list_display = ('title', 'states')

class StateAdmin(admin.ModelAdmin):
    list_display = ('name', 'population','bestPractices')

class BestPracticeAdmin(admin.ModelAdmin):
    list_display = ('title')



# Register your models here.
admin.site.register(IssueArea, IssueAreaAdmin)
# admin.site.register(State, StateAdmin)
# admin.site.register(BestPractice, BestPracticeAdmin)


