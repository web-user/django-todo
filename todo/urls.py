from django.urls import path, include
from django.contrib.auth.views import login
from django.contrib.auth.views import logout
from django.contrib.auth.views import logout_then_login

from . import views

urlpatterns = [
    path('dashboard/', views.ProjectListView.as_view(), name='home'),
    path('login/', views.LoginFormView.as_view(), name='login'),
    path('registration/', views.RegisterFormView.as_view(), name='registration'),

    path('logout/', views.logout_view, name='logout'),

    path('project-create/', views.ProjectCreate.as_view(), name='project_create'),

    path('todo-create/', views.ProjectTodoCreate.as_view(), name='todo_create'),

    # projec/2/delete/
    path('project/<int:pk>/delete/', views.ProjecDelete.as_view(), name='project_delete'),

    # projec/2/update/
    path('project/<int:pk>/update/', views.ProjecUpdate.as_view(), name='project_update'),

]
app_name = 'todo'