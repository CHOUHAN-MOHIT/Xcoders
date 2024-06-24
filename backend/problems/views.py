from rest_framework import generics, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from .models import Problem, Solution , Test
from .serializers import ProblemSerializer , SubmissionSerializer
from . import helper , docker_utility

class ProblemListView(generics.ListAPIView):
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer

class ProblemDetailView(APIView):
    def get_object(self, pk):
        try:
            return Problem.objects.get(pk=pk)
        except Problem.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        problem = self.get_object(pk)
        serializer = ProblemSerializer(problem)
        return Response(serializer.data)

class SubmissionCreateView(APIView):
    def post(self, request, problem_id):
        problem = get_object_or_404(Problem, pk=problem_id)
        test = Test.objects.get(problem = problem)
        serializer = SubmissionSerializer(data=request.data, context={'request': request , 'problem_id':problem_id})
        if serializer.is_valid():
            code = serializer.validated_data.get('code')
            language = serializer.validated_data.get('language')

            verdict = docker_utility.evaulate_code_in_docker(code , language , test)
            serializer.validated_data['verdict'] = verdict
            serializer.save()
            return Response(serializer.data , status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)