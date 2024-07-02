from django.contrib import admin
from .models import Problem, Test, Solution , Example

class ExampleInline(admin.TabularInline):
    model = Example
    extra = 1  # Number of empty examples to show by default

class TestInline(admin.TabularInline):
    model = Test
    extra = 1  # Number of empty tests to show by default

class ProblemAdmin(admin.ModelAdmin):
    inlines = [ExampleInline, TestInline]

# Register your models here.
admin.site.register(Problem , ProblemAdmin)
admin.site.register(Test)
admin.site.register(Solution)