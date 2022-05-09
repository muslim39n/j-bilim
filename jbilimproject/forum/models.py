from django.db import models
from django.contrib.auth.models import User

class ForumPage(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    created = models.DateTimeField(auto_now_add=True)

class Comment(models.Model):
    forum_page = models.ForeignKey(ForumPage, on_delete=models.CASCADE)
    body = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    answer_to = models.ForeignKey('self', on_delete=models.CASCADE, null=True, default=None)
    
    created = models.DateTimeField(auto_now_add=True)
