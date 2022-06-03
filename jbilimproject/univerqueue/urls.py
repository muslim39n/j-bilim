from django.urls import path

from .views import UniversityList, UniverQueueList, CityList, UniversityDetail, SignUp, UserModelView

urlpatterns = [
    path('', UniversityList.as_view(), name='all_univers'),
    path('<int:univer_id>/', UniversityDetail.as_view(), name='univer-detail'),
    path('<int:univer_id>/q/<int:queue_month>/<int:queue_day>/', UniverQueueList.as_view(), name='univer_queue'),
    path('cities/', CityList.as_view(), name='city_list'),
    path('signup2/', SignUp.as_view(), name='signup2'),
    path('user/', UserModelView.as_view(), name='get_user'),
]