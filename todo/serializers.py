from .models import Post, Project, Todo
from rest_framework import routers, serializers, viewsets

class TodoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Todo
        fields = '__all__'