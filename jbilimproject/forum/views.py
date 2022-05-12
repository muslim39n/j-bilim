from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from rest_framework.status import HTTP_201_CREATED

from .models import ForumPage, Comment
from .serializers import ForumPageSerializer, ForumPageShortSerializer, CommentSerializer
from rest_framework.pagination import PageNumberPagination


class ForumPagePagination(PageNumberPagination):
    page_size = 2
    page_size_query_param = 'page_size'
    max_page_size = 150


class ForumPageList(ListAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly, ]
    queryset = ForumPage.objects.all()
    serializer_class = ForumPageShortSerializer
    pagination_class = ForumPagePagination

    def post(self, request, format=None):
        page = ForumPage(title=request.data['title'],
                        body=request.data['body'],
                        user=request.user)

        page.save()

        return Response(ForumPageSerializer(page).data, status=HTTP_201_CREATED) 
        
        
class ForumPageDetail(APIView):
    def get_object(self, pk):
        try:
            return ForumPage.objects.get(pk=pk)
        except:
            raise Http404

    def get(self, request, pk, format=None):
        page = self.get_object(pk)
        serializer = ForumPageSerializer(page)
        return Response(serializer.data)


class CommentPostView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly, ]
    def post(self, request, page_id, format=None):
        try:
            page = ForumPage.objects.get(pk=page_id)
        except:
            raise Http404

        '''
        forum_page = models.ForeignKey(ForumPage, on_delete=models.CASCADE)
        body = models.TextField()
        user = models.ForeignKey(User, on_delete=models.CASCADE)
        
        created = models.DateTimeField(auto_now_add=True)
        '''
        comment = Comment(forum_page=page,
                        body=request.data['body'],
                        user=request.user)

        comment.save()
        
        return Response(ForumPageSerializer(page).data, status=HTTP_201_CREATED) 
