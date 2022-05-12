from django.urls import path

from .views import UniversityList, UniverQueueList

urlpatterns = [
    path('', UniversityList.as_view(), name='all_univers'),
    path('q/<int:univer_id>/<int:queue_month>/<int:queue_day>/', UniverQueueList.as_view(), name='univer_queue'),
]