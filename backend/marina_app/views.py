from django.shortcuts import render
from rest_framework import viewsets
from .serializers import IssueAreaSerializer, StateSerializer, ImplementationSerializer
from .models import IssueArea, State, Implementation

class IssueAreaView(viewsets.ModelViewSet):
    serializer_class = IssueAreaSerializer
    queryset = IssueArea.objects.all()

class StateView(viewsets.ModelViewSet):
    serializer_class = StateSerializer
    queryset = State.objects.all()

class ImplmentationView(viewsets.ModelViewSet):
    serializer_class = ImplementationSerializer
    queryset = Implementation.objects.all()