from django.db import models
from problems.models import Problem
from users.models import User

class Contest(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

class ContestProblem(Problem):
    points = models.IntegerField()

    def __str__(self):
        return f"{self.name} (Contest Problem)"

class ContestRegistration(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    contest = models.ForeignKey(Contest, on_delete=models.CASCADE)
    registration_time = models.DateTimeField(auto_now_add=True)