from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# Create your models here.

class PublishedManager(models.Manager):

    def get_queryset(self):
        return super(PublishedManager, self).get_queryset()\
                .filter(status='published')



class Post(models.Model):
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('private', 'Private'),
    )
    title = models.CharField(max_length=250)
    slug = models.SlugField(max_length=250, unique_for_date='publish')
    author = models.ForeignKey(User, related_name='blog_posts', on_delete=models.CASCADE)
    body = models.TextField()
    publish = models.DateTimeField(default=timezone.now)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')


    objects = models.Manager()
    published = PublishedManager()

    class Meta:
        ordering = ('-publish',)

    def __str__(self):
        return self.title

class Project(models.Model):
    title = models.CharField(max_length=250)
    color = models.TextField()

    objects = models.Manager()

    def __str__(self):
        return self.title

class Todo(models.Model):
    PRIORIT_CHOICES = (
        ('high', 'High Priority'),
        ('medium', 'Medium Priority'),
        ('low', 'Low Priority'),
    )
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='todos')
    title = models.CharField(max_length=250)
    todo_priority = models.CharField(max_length=250, choices=PRIORIT_CHOICES, default='high')
    date_todo = models.DateField()

    objects = models.Manager()

    def __str__(self):
        return self.title






