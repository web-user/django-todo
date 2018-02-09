from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.forms import inlineformset_factory
from .models import Project, Todo

import django_filters


class TodoFilter(django_filters.FilterSet):

    date = django_filters.DateFilter(name='date_todo', lookup_expr='gte')
    end_date = django_filters.DateFilter(name='date_todo', lookup_expr='lte')

    # completed_tasks

    status_display = django_filters.AllValuesFilter(name='completed_tasks')


    class Meta:
        model = Todo
        fields = ('date', 'end_date', 'status_display' )


class LoginForm(forms.Form):
	username = forms.CharField()
	password = forms.CharField(widget=forms.PasswordInput)




class SignUpForm(UserCreationForm):
	first_name = forms.CharField(max_length=30, required=False, help_text='Optional.')
	last_name = forms.CharField(max_length=30, required=False, help_text='Optional.')
	email = forms.EmailField(max_length=254, help_text='Required. Inform a valid email address.')

	class Meta:
		model = User
		fields = ('username', 'first_name', 'last_name', 'email', 'password1', 'password2', )


class TodoForm(forms.ModelForm):

    class Meta:
        model = Todo
        fields = ['project', 'title', 'todo_priority', 'date_todo']
        exclude = ()

TodoFormSet = inlineformset_factory(Project, Todo, form=TodoForm, extra=1)