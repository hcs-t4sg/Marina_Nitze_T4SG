from django.shortcuts import render
from rest_framework import viewsets
from .serializers import IssueAreaSerializer, StateSerializer, ImplementationGuidanceSerializer, IntroductionTextSerializer, ConclusionTextSerializer
from .models import IssueArea, State, ImplementationGuidance, IntroductionText, ConclusionText

class IssueAreaView(viewsets.ModelViewSet):
    serializer_class = IssueAreaSerializer
    queryset = IssueArea.objects.all()

class StateView(viewsets.ModelViewSet):
    serializer_class = StateSerializer
    queryset = State.objects.all()

class ImplementationGuidanceView(viewsets.ModelViewSet):
    serializer_class = ImplementationGuidanceSerializer
    queryset = ImplementationGuidance.objects.all()

class IntroductionTextView(viewsets.ModelViewSet):
    serializer_class = IntroductionTextSerializer
    queryset = IntroductionText.objects.all()

class ConclusionTextView(viewsets.ModelViewSet):
    serializer_class = ConclusionTextSerializer
    queryset = ConclusionText.objects.all()