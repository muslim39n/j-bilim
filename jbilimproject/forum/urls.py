from django.urls import path

from .views import ForumPageList, ForumPageDetail

urlpatterns = [
    path('', ForumPageList.as_view(), name='forum_all_pages'),
    path('<int:pk>/', ForumPageDetail.as_view(), name='forum_page_detail'),
]