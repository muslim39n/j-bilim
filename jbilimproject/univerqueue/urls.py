from django.urls import path

from .views import UniversityList, UniverQueueList, CityList, UniversityDetail

urlpatterns = [
    path('', UniversityList.as_view(), name='all_univers'),
    path('<int:univer_id>/', UniversityDetail.as_view(), name='univer-detail'),
    path('<int:univer_id>/q/<int:queue_month>/<int:queue_day>/', UniverQueueList.as_view(), name='univer_queue'),
    path('cities/', CityList.as_view(), name='city_list'),
]