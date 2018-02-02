from .models import Post, Project, Todo
from rest_framework import routers, serializers, viewsets

class ProjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Project
        fields = '__all__'