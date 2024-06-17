from django.urls import path
from .views import ProblemListView, ProblemDetailView , SubmissionCreateView

urlpatterns = [
    path('', ProblemListView.as_view(), name='problem-list'),
    path('<int:pk>/', ProblemDetailView.as_view(), name='problem-detail'),
    path('submissions/<int:problem_id>/', SubmissionCreateView.as_view(), name='submission-create'),
]
