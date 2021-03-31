from rest_framework import serializers
from .models import IssueArea, State, Implementation

class IssueAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = IssueArea
        fields = ('title', 'intro_text','conclusion_text','practice_1','practice_1_description','practice_2','practice_2_description',
                'practice_3','practice_3_description','practice_4','practice_4_description','practice_5','practice_5_description',
                'practice_6','practice_6_description','practice_7','practice_7_description')

class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = State
        fields = ('name', 'abbreviation', 'population','county_administered')

class ImplementationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Implementation
        fields = ('state','issue_area','practice_1','practice_2','practice_3','practice_4',
                'practice_5','practice_6','practice_7')
