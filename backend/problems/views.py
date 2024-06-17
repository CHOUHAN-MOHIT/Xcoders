from rest_framework import generics, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from .models import Problem, Solution
from .serializers import ProblemSerializer , SubmissionSerializer

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
        serializer = SubmissionSerializer(data=request.data, context={'request': request , 'problem_id':problem_id})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)