from django.urls import path

from .views import PostList

urlpatterns = [
    path('all/', PostList.as_view(), name='post-list'),
]