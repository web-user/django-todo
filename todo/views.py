from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404
from django.contrib.auth import authenticate, login
from django.urls import reverse

from .forms import LoginForm
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect
from django.contrib.auth import logout
from .models import Post
from django.contrib.auth.forms import UserCreationForm

from django.views.generic import FormView, ListView


class RegisterFormView(FormView):

    template_name = 'todo/auth.html'
    form_class = LoginForm

    def form_valid(self, form):

        cd = form.cleaned_data
        user = authenticate(username=cd['username'], password=cd['password'])
        if user and user.is_active:
            login(self.request, user)
            return redirect('/todo/')
        else:
            HttpResponse('Invalid login')

    def form_invalid(self, form):
        return HttpResponse('Invalid login')


class PostListView(LoginRequiredMixin, ListView):

    login_url = '/registration/'
    template_name = 'todo/list.html'
    context_object_name = 'posts'
    model = Post


def logout_view(request):
    logout(request)
    return redirect(reverse('todo:registration'))
    # Redirect to a success page.