from django.shortcuts import render
from rest_framework import viewsets
from .serializers import IssueAreaSerializer, BestPracticeSerializer, StateSerializer
from .models import IssueArea, BestPractice, State

class IssueAreaView(viewsets.ModelViewSet):
    serializer_class = IssueAreaSerializer
    queryset = IssueArea.objects.all()

class BestPracticeView(viewsets.ModelViewSet):
    serializer_class = BestPracticeSerializer
    queryset = BestPractice.objects.all()

class StateView(viewsets.ModelViewSet):
    serializer_class = StateSerializer
    queryset = State.objects.all()