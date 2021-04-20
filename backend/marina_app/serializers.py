from rest_framework import serializers
from .models import IssueArea, State, Implementation, Contact, AboutUs


class IssueAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = IssueArea
        fields =  ('title', 'num_practices','intro_text','conclusion_text',
                'practice_1','practice_1_question','practice_1_description','practice_1_quote','practice_1_link','num_subpractices_1','subpractices_1_names',
                'practice_2','practice_2_question','practice_2_description','practice_2_quote','practice_2_link','num_subpractices_2','subpractices_2_names',
                'practice_3','practice_3_question','practice_3_description','practice_3_quote','practice_3_link','num_subpractices_4','subpractices_3_names',
                'practice_4','practice_4_question','practice_4_description','practice_4_quote','practice_4_link','num_subpractices_4','subpractices_4_names',
                'practice_5','practice_5_question','practice_5_description','practice_5_quote','practice_5_link','num_subpractices_5','subpractices_5_names',
                'practice_6','practice_6_question','practice_6_description','practice_6_quote','practice_6_link','num_subpractices_6','subpractices_6_names',
                'practice_7','practice_7_question','practice_7_description','practice_7_quote','practice_7_link','num_subpractices_7','subpractices_7_names')


class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = State
        fields = ('name', 'abbreviation', 'population','county_administered')

class ImplementationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Implementation
        fields = ('state','issue_area',
                    'practice_1','subpractice_1_1','subpractice_1_2','subpractice_1_3',
                    'practice_2','subpractice_2_1','subpractice_2_2','subpractice_2_3',
                    'practice_3','subpractice_3_1','subpractice_3_2','subpractice_3_3',
                    'practice_4','subpractice_4_1','subpractice_4_2','subpractice_4_3',
                    'practice_5','subpractice_5_1','subpractice_5_2','subpractice_5_3',
                    'practice_6','subpractice_6_1','subpractice_6_2','subpractice_6_3',
                    'practice_7','subpractice_7_1','subpractice_7_2','subpractice_7_3')

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ('issue_area', 'first_name', 'last_name','position', 'email')

class AboutUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Implementation
        fields = ('title', 'body')
