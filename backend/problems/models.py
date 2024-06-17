from django.db import models
from users.models import User


# Create your models here.
class Problem(models.Model):
    Difficulty_choices = (
    ('hard' , 'hard'),
    ('medium' , 'medium'),
    ('easy' , 'easy'),
    )
    name = models.CharField(max_length=255)
    description = models.TextField()
    difficulty = models.CharField(max_length=10, choices=Difficulty_choices)
    tag = models.CharField(max_length=50)

    def __str__(self):
        return self.problem_name

class Test(models.Model):
    problem = models.ForeignKey(Problem , on_delete=models.CASCADE)
    input = models.TextField()
    output = models.TextField()



class Solution(models.Model):
    Language_choices = (
        ('c++' , 'cpp'),
    )
    Verdict_choices = (
        ('CE' , 'Compilation Error'),
        ('WA' , 'Wrong Answer'),
        ('RE' , 'Runtime Error'),
        ('AC' , 'All Correct'),
    )
    user = models.ForeignKey(User ,on_delete=models.CASCADE)
    problem = models.ForeignKey(Problem , on_delete=models.CASCADE)
    language = models.CharField(max_length=10 , choices=Language_choices)
    code = models.TextField()
    verdict = models.CharField(max_length=5 , choices=Verdict_choices)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username + " submitted " + self.problem.problem_name