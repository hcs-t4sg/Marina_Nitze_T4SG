from rest_framework import serializers
from .models import IssueArea
from .models import BestPractice
from .models import State

class IssueAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = IssueArea
        fields = ('title', 'states')

class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = State
        fields = ('name', 'population', 'bestPractices')

class BestPracticeSerializer(serializers.ModelSerializer):
    class Meta:
        model = BestPractice
        fields = ('title')