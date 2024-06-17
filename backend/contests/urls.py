from django.urls import path
from .views import ContestListView, ContestDetailView, ContestRegistrationView

urlpatterns = [
    path('', ContestListView.as_view(), name='contest-list'),
    path('<int:contest_id>/', ContestDetailView.as_view(), name='contest-detail'),
    path('<int:contest_id>/register/', ContestRegistrationView.as_view(), name='contest-register'),
]
