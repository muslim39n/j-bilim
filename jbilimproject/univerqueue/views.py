from django.http import Http404
import datetime

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from rest_framework.status import HTTP_201_CREATED

from .models import University, UniverQueue, QueuePlace
from .serializers import UniversitySerializer, UniverQueueSerializer, QueuePlaceSerializer

class UniversityList(ListAPIView):
    queryset = University.objects.all()
    serializer_class = UniversitySerializer

class UniverQueueList(APIView):
    def get(self, request, univer_id, queue_month, queue_day, format=None):
        try:
            univer = University.objects.get(pk=univer_id)
            date = datetime.date(datetime.datetime.today().year, queue_month, queue_day)
        except:
            raise Http404

        queues = UniverQueue.objects.filter(univer=univer)
        data = []

        for q in queues:
            q_places = QueuePlace.objects.filter(queue=q, date=date).order_by('n')
            q_data = UniverQueueSerializer(q).data
            q_data['places'] = QueuePlaceSerializer(q_places, many=True).data
            data.append(q_data)
    
        return Response(data)
            
