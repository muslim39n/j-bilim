from rest_framework import serializers

from .models import ForumPage, Comment, User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Comment
        fields = ['id', 'body', 'created', 'user'] 

class ForumPageSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    comment_set = CommentSerializer(many=True, read_only=True)
    class Meta:
        model = ForumPage
        fields = ['id', 'title', 'body', 'created', 'comment_set', 'user']

class ForumPageShortSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = ForumPage
        fields = ['id', 'title', 'short_body', 'created', 'user']
