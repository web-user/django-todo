from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from django.urls import reverse_lazy, reverse

from .forms import LoginForm, TodoFormSet, TodoForm
from django.shortcuts import redirect
from django.contrib.auth import logout
from .models import Post, Project, Todo
from .serializers import ProjectSerializer
from django.contrib.auth.forms import UserCreationForm


from rest_framework import routers, serializers, viewsets

from rest_framework.views import APIView

from django.views.generic import FormView, ListView
from django.views.generic.edit import CreateView, UpdateView, DeleteView
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


class ProjectListView(LoginRequiredMixin, ListView):

    login_url = '/login/'
    template_name = 'todo/list.html'
    context_object_name = 'posts'
    model = Project
    form_class = TodoForm


def logout_view(request):
    logout(request)
    return redirect(reverse('todo:login'))
    # Redirect to a success page.


class ProjectCreate(CreateView):

    model = Project
    fields = ['title', 'color']
    success_url = reverse_lazy('todo:home')



class ProjecUpdate(UpdateView):
    model = Project
    fields = ['title', 'color']
    success_url = reverse_lazy('todo:home')


class ProjecDelete(DeleteView):
    model = Project
    success_url = reverse_lazy('todo:home')


class ProjectTodoCreate(CreateView):

    form_class = TodoForm
    template_name = 'todo/list.html'




