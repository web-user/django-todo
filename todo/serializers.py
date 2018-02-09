from .models import Post, Project, Todo
from rest_framework import routers, serializers, viewsets

class TodoSerializer(serializers.ModelSerializer):

    color = serializers.ReadOnlyField(source='project.color')
    project_title = serializers.ReadOnlyField(source='project.title')

    class Meta:
        model = Todo
        fields = ('id', 'project', 'title', 'todo_priority', 'date_todo',
                  'album_logo', 'completed_tasks', 'color', 'project_title')