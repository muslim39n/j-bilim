from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now=True)
    added = models.DateTimeField(null=True, default=None)
    original_url = models.CharField(max_length=200)
    useless_voices = models.IntegerField(default=0)

    def __str__(self):
        return self.title + '  < ' + str(self.pk) + ' >'

class Paragraph(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    text = models.TextField()

    def __str__(self):
        return self.text[:10] + '... Post ' + str(self.post.pk)