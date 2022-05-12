from rest_framework import serializers


from .models import University, UniverQueue, QueuePlace

class UniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = '__all__'

class QueuePlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = QueuePlace
        fields = '__all__'

class UniverQueueSerializer(serializers.ModelSerializer):
    class Meta:
        model = UniverQueue
        fields = ['id', 'queue_type', 'minutes', 
                    'startTime', 'endTime', 
                    'startBreakTime', 'endBreakTime', 'places']
