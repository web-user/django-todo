from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from django.urls import reverse

from .forms import LoginForm
from django.shortcuts import redirect
from django.contrib.auth import logout
from .models import Post, Project, Todo
from django.contrib.auth.forms import UserCreationForm


from rest_framework import routers, serializers, viewsets

from django.views.generic import FormView, ListView
import json



class LoginFormView(FormView):
    template_name = 'todo/auth.html'
    form_class = LoginForm

    def form_valid(self, form):

        cd = form.cleaned_data
        user = authenticate(username=cd['username'], password=cd['password'])
        if user and user.is_active:
            login(self.request, user)
            return redirect('/todo/')
        return HttpResponse('Invalid User')

    def form_invalid(self, form):
        return HttpResponse('Invalid login')


class RegisterFormView(FormView):

    template_name = 'todo/registration.html'
    form_class = UserCreationForm

    def form_valid(self, form):

        form.save()
        username = form.cleaned_data.get('username')
        raw_password = form.cleaned_data.get('password1')
        user = authenticate(username=username, password=raw_password)

        if user and user.is_active:
            login(self.request, user)
            return redirect('/todo/')
        return HttpResponse('Invalid User')

    def form_invalid(self, form):
        return HttpResponse('Invalid login')


class TodoListView(LoginRequiredMixin, ListView):

    login_url = '/login/'
    template_name = 'todo/list.html'
    context_object_name = 'posts'
    model = Project


def logout_view(request):
    logout(request)
    return redirect(reverse('todo:login'))
    # Redirect to a success page.


class ProjectFormView(FormView):

    model = Project
    
    def post(self, request):

        p1 = request.POST['data_color']
        p2 = 'Test'

        proj = Project(title=p1, color=p2)
        proj.save()
        print(proj)

        print('>>',request.POST['data_color'])
        return redirect('/todo/')

