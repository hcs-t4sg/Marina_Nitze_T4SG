from django.contrib import admin
from .models import IssueArea, State, Implementation

class IssueAreaAdmin(admin.ModelAdmin):
    list_display = ('title', 'intro_text','conclusion_text','practice_1','practice_1_description','practice_2','practice_2_description',
                'practice_3','practice_3_description','practice_4','practice_4_description','practice_5','practice_5_description',
                'practice_6','practice_6_description','practice_7','practice_7_description')

class StateAdmin(admin.ModelAdmin):
    list_display = ('name', 'abbreviation', 'population','county_administered')

class ImplementationAdmin(admin.ModelAdmin):
    list_display = ('state','issue_area','practice_1','practice_2','practice_3','practice_4',
                'practice_5','practice_6','practice_7')

# Register your models here.
admin.site.register(IssueArea, IssueAreaAdmin)
admin.site.register(State, StateAdmin)
admin.site.register(Implementation, ImplementationAdmin)


