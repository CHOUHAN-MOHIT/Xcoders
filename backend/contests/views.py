from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Contest, ContestRegistration
from .serializers import ContestSerializer , ContestRegistrationSerializer

class ContestListView(APIView):
    def get(self, request):
        contests = Contest.objects.all()
        serializer = ContestSerializer(contests, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ContestDetailView(APIView):
    def get(self, request, contest_id):
        contest = get_object_or_404(Contest, pk=contest_id)
        serializer = ContestSerializer(contest)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ContestRegistrationView(APIView):
    def post(self, request, contest_id):
        contest = get_object_or_404(Contest, pk=contest_id)
        registration, created = ContestRegistration.objects.get_or_create(
            user=request.user, contest=contest
        )
        if created:
            serializer = ContestRegistrationSerializer(registration)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({"detail": "Already registered."}, status=status.HTTP_400_BAD_REQUEST)