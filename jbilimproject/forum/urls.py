from django.urls import path

from .views import ForumPageList, ForumPageDetail, CommentPostView

urlpatterns = [
    path('', ForumPageList.as_view(), name='forum_all_pages'),
    path('<int:pk>/', ForumPageDetail.as_view(), name='forum_page_detail'),
    path('<int:page_id>/comment/', CommentPostView.as_view(), name='add_comment'),
]