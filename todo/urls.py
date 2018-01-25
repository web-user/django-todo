from django.urls import path, include
from django.contrib.auth.views import login
from django.contrib.auth.views import logout
from django.contrib.auth.views import logout_then_login

from . import views

urlpatterns = [
    path('todo/', views.PostListView.as_view(), name='home'),
    path('login/', login, name='login'),
    path('registration/', views.RegisterFormView.as_view(), name='registration'),

    path('logout/', views.logout_view, name='logout'),

]
app_name = 'todo'