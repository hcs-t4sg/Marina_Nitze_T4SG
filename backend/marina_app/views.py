from django.shortcuts import render
from rest_framework import viewsets
from .serializers import IssueAreaSerializer, StateSerializer, ImplementationSerializer, ContactSerializer, AboutUsSerializer
from .models import IssueArea, State, Implementation, Contact, AboutUs


class IssueAreaView(viewsets.ModelViewSet):
    serializer_class = IssueAreaSerializer
    queryset = IssueArea.objects.all()

class StateView(viewsets.ModelViewSet):
    serializer_class = StateSerializer
    queryset = State.objects.all()

class ImplementationView(viewsets.ModelViewSet):
    serializer_class = ImplementationSerializer
    queryset = Implementation.objects.all()

class ContactView(viewsets.ModelViewSet):
    serializer_class = ContactSerializer
    queryset = Contact.objects.all()

class AboutUsView(viewsets.ModelViewSet):
    serializer_class = AboutUsSerializer
    queryset = AboutUs.objects.all()