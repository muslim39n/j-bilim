from rest_framework import serializers


from .models import University, UniverQueue, QueuePlace, UniverAction, UniverStep

class UniverStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = UniverStep
        fields = '__all__'

class UniverActionSerializer(serializers.ModelSerializer):
    universtep_set = UniverStepSerializer(many=True, read_only=True)
    class Meta:
        model = UniverAction
        fields = ['id', 'title', 'universtep_set']


class UniversitySerializer(serializers.ModelSerializer):
    univeraction_set = UniverActionSerializer(many=True, read_only=True)
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
