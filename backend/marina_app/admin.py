from django.contrib import admin
from .models import IssueArea, State, ImplementationGuidance

class IssueAreaAdmin(admin.ModelAdmin):
    list_display = ('title', 'get_states', 'introduction_text', 'conclusion_text')

class StateAdmin(admin.ModelAdmin):
    list_display = ('name', 'abbreviation', 'population',
        'electronic_request', 'no_notary_required', 'no_fee', 'no_contact', 'no_witness_required', 'county_administered')

class ImplementationGuidanceAdmin(admin.ModelAdmin):
    list_display = ('name', 'question', 'why', 'quote', 'link')


# Register your models here.
admin.site.register(IssueArea, IssueAreaAdmin)
admin.site.register(State, StateAdmin)
admin.site.register(ImplementationGuidance, ImplementationGuidanceAdmin)



