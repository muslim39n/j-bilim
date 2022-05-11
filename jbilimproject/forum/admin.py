from django.contrib import admin
from .models import ForumPage, Comment

admin.site.register([ForumPage, Comment])
