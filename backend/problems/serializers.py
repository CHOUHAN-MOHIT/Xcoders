from rest_framework import serializers
from .models import Problem , Solution
from django.shortcuts import get_object_or_404

class ProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = '__all__'

class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Solution
        fields = ('problem', 'language', 'code', 'verdict', 'timestamp')
        read_only_fields = ('problem', 'user', 'verdict', 'timestamp')

    def create(self, validated_data):
        problem_id = self.context.get('problem_id')  # Retrieve problem_id from context
        problem = get_object_or_404(Problem, pk=problem_id)
        user = self.context['request'].user
        submission = Solution.objects.create(problem=problem, user=user, **validated_data)
        return submission
