from rest_framework import serializers
from .models import IssueArea, State, Implementation, Contact


class IssueAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = IssueArea
        fields =  ('title', 'num_practices','intro_text','conclusion_text',
                'practice_1','practice_1_question','practice_1_description','practice_1_quote','practice_1_link',
                'practice_2','practice_2_question','practice_2_description','practice_2_quote','practice_2_link',
                'practice_3','practice_3_question','practice_3_description','practice_3_quote','practice_3_link',
                'practice_4','practice_4_question','practice_4_description','practice_4_quote','practice_4_link',
                'practice_5','practice_5_question','practice_5_description','practice_5_quote','practice_5_link',
                'practice_6','practice_6_question','practice_6_description','practice_6_quote','practice_6_link',
                'practice_7','practice_7_question','practice_7_description','practice_7_quote','practice_7_link')


class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = State
        fields = ('name', 'abbreviation', 'population','county_administered')

class ImplementationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Implementation
        fields = ('state','issue_area','practice_1','practice_2','practice_3','practice_4',
                'practice_5','practice_6','practice_7')

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ('issue_area', 'first_name', 'last_name','position', 'email')
