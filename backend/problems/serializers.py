from rest_framework import serializers
from .models import Problem , Solution , Example
from django.shortcuts import get_object_or_404

class ProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = '__all__'

class ExampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Example
        fields = ['input' , 'output' , 'explaination'] 

class ProblemDetailSerializer(serializers.ModelSerializer):
    examples = ExampleSerializer(many=True, read_only=True)

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
