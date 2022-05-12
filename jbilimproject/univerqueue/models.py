from django.db import models

class University(models.Model):
    slug = models.SlugField(max_length=32)
    name_kz = models.CharField(max_length=256)
    name_ru = models.CharField(max_length=256)

    code = models.PositiveSmallIntegerField()
    description = models.TextField()
    
class UniverQueue(models.Model):
    univer = models.ForeignKey(University, on_delete=models.CASCADE)
    queue_type = models.CharField(max_length=6,
                                choices=[
                                    ('CN', 'Консультация'),
                                    ('DC', 'Документ тапсыру/Подача документов'),
                                ], default='CN')
    minutes = models.PositiveSmallIntegerField()
    startTime = models.TimeField()
    endTime = models.TimeField()
    startBreakTime = models.TimeField()
    endBreakTime = models.TimeField()
    places = models.PositiveSmallIntegerField()

        

    