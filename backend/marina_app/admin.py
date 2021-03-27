from django.contrib import admin
from .models import IssueArea, State, ImplementationGuidance, IntroductionText, ConclusionText

class IssueAreaAdmin(admin.ModelAdmin):
    list_display = ('title', 'get_states')

class StateAdmin(admin.ModelAdmin):
    list_display = ('name', 'abbreviation', 'population',
        'electronic_request', 'no_notary_required', 'no_fee', 'no_contact', 'no_witness_required', 'county_administered')

class ImplementationGuidanceAdmin(admin.ModelAdmin):
    list_display = ('name', 'question', 'why', 'quote', 'link')

class IntroductionTextAdmin(admin.ModelAdmin):
    list_display = ('title', 'text')

class ConclusionTextAdmin(admin.ModelAdmin):
    list_display = ('title', 'text')

# Register your models here.
admin.site.register(IssueArea, IssueAreaAdmin)
admin.site.register(State, StateAdmin)
admin.site.register(ImplementationGuidance, ImplementationGuidanceAdmin)
admin.site.register(IntroductionText, IntroductionTextAdmin)
admin.site.register(ConclusionText, ConclusionTextAdmin)



