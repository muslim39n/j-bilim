from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework.status import HTTP_201_CREATED

from .models import Post, Paragraph
from .serializers import PostSerializer, ParagraphSerializer

class PostList(APIView):
    def get(self, request, format=None):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        if 'added' in request.data:
            post = Post.objects.create(title=request.data['title'],
                                        added=request.data['added'],
                                        original_url=request.data['original_url'])

        else:
            post = Post.objects.create(title=request.data['title'],
                                        original_url=request.data['original_url'])

        for p_text in request.data['paragraphs']:
            Paragraph.objects.create(post=post, text=p_text)

        return Response(PostSerializer(post).data, status=HTTP_201_CREATED)


class PostDetail(APIView):
    def get_object(self, pk):
        try:
            return Post.objects.get(pk=pk)
        except:
            raise Http404

    def get(self, request, pk, format=None):
        post = self.get_object(pk)

        serializer = PostSerializer(post)

        return Response(serializer.data)