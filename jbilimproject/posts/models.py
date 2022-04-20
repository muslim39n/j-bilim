from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now=True)
    added = models.DateTimeField(null=True, default=None)
    original_url = models.CharField(max_length=200)
    useless_voices = models.IntegerField(default=0)

class Paragraph(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    text = models.TextField()