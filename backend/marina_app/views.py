from django.shortcuts import render
from rest_framework import viewsets
from .serializers import IssueAreaSerializer, StateSerializer, ImplementationGuidanceSerializer
from .models import IssueArea, State, ImplementationGuidance

class IssueAreaView(viewsets.ModelViewSet):
    serializer_class = IssueAreaSerializer
    queryset = IssueArea.objects.all()

class StateView(viewsets.ModelViewSet):
    serializer_class = StateSerializer
    queryset = State.objects.all()

class ImplementationGuidanceView(viewsets.ModelViewSet):
    serializer_class = ImplementationGuidanceSerializer
    queryset = ImplementationGuidance.objects.all()