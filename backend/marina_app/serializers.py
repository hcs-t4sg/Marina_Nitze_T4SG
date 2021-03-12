from rest_framework import serializers
from .models import IssueArea, State

class IssueAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = IssueArea
        fields = ('title', 'states')

class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = State
        fields = ('name', 'abbreviation', 'population', 
            'electronic_request', 'no_notary_required', 'no_fee', 'no_contact', 'no_witness_required','county_administered')
