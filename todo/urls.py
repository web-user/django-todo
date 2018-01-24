from django.urls import path, include
from . import views

urlpatterns = [
    path('todo/', views.index, name='home'),
    path('registration/', views.registration, name='registration'),


]
app_name = 'todo'