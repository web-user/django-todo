from django.urls import path, include
from django.contrib.auth.views import login
from django.contrib.auth.views import logout
from django.contrib.auth.views import logout_then_login

from . import views

urlpatterns = [
    path('todo/', views.TodoListView.as_view(), name='home'),
    path('login/', views.LoginFormView.as_view(), name='login'),
    path('registration/', views.RegisterFormView.as_view(), name='registration'),

    path('logout/', views.logout_view, name='logout'),

    path('project/', views.ProjectFormView.as_view(), name='project'),

]
app_name = 'todo'