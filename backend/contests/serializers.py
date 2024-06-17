from rest_framework import serializers
from .models import Contest , ContestRegistration

class ContestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contest
        fields = ['id', 'name','description', 'start_time', 'end_time']

class ContestRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContestRegistration
        fields = ['user', 'contest', 'registration_time']
        read_only_fields = ['user', 'registration_time']
