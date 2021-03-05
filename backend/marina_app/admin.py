from django.contrib import admin
from .models import IssueArea, State

class IssueAreaAdmin(admin.ModelAdmin):
    list_display = ('title', 'get_states')

class StateAdmin(admin.ModelAdmin):
    list_display = ('name', 'abbreviation', 'population',
        'electronic_request', 'no_notary_required', 'no_fee', 'office_contact', 'no_witness_required')



# Register your models here.
admin.site.register(IssueArea, IssueAreaAdmin)
admin.site.register(State, StateAdmin)


