from django.shortcuts import render
from rest_framework import viewsets
from .serializers import IssueAreaSerializer, StateSerializer, ImplementationSerializer, ContactSerializer
from .models import IssueArea, State, Implementation, Contact


class IssueAreaView(viewsets.ModelViewSet):
    serializer_class = IssueAreaSerializer
    queryset = IssueArea.objects.all()

class StateView(viewsets.ModelViewSet):
    serializer_class = StateSerializer
    queryset = State.objects.all()

class ImplmentationView(viewsets.ModelViewSet):
    serializer_class = ImplementationSerializer
    queryset = Implementation.objects.all()

class ContactView(viewsets.ModelViewSet):
    serializer_class = ContactSerializer
    queryset = Contact.objects.all()