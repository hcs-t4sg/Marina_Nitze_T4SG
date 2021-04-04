from django.contrib import admin
from .models import IssueArea, State, Implementation

class IssueAreaAdmin(admin.ModelAdmin):
    list_display = ('title', 'num_practices','intro_text','conclusion_text',
                'practice_1','practice_1_description','practice_1_link',
                'practice_2','practice_2_description','practice_2_link',
                'practice_3','practice_3_description','practice_3_link',
                'practice_4','practice_4_description','practice_4_link',
                'practice_5','practice_5_description','practice_5_link',
                'practice_6','practice_6_description','practice_6_link',
                'practice_7','practice_7_description','practice_7_link')

class StateAdmin(admin.ModelAdmin):
    list_display = ('name', 'abbreviation', 'population','county_administered')

class ImplementationAdmin(admin.ModelAdmin):
    list_display = ('state','issue_area','practice_1','practice_2','practice_3','practice_4',
                'practice_5','practice_6','practice_7')

# Register your models here.
admin.site.register(IssueArea, IssueAreaAdmin)
admin.site.register(State, StateAdmin)
admin.site.register(Implementation, ImplementationAdmin)


