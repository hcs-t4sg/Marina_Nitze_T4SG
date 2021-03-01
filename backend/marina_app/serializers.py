from rest_framework import serializers
from .models import IssueArea, State

class IssueAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = IssueArea
        fields = ('title', 'states')

class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = State
        fields = ('name', 'population', 'bestPractice1', 'bestPractice2', 'bestPractice3')
