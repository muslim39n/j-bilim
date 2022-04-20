from rest_framework import serializers

from .models import Paragraph, Post

class ParagraphSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'text']

class PostSerializer(serializers.ModelSerializer):
    paragraph_set = ParagraphSerializer(many=True, read_only=True)
    class Meta:
        model = Post
        fields = ['id', 'title', 'created', 'added', 'original_url']


