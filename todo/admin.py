from django.contrib import admin
from .models import Project, Todo

# Register your models here.
admin.site.register(Project)
admin.site.register(Todo)