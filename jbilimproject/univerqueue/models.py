from django.db import models

import datetime
from django.core.exceptions import ValidationError

def add_mins_to_time(timeval, mins_to_add):
    dummy_date = datetime.date(1, 1, 1)
    full_datetime = datetime.datetime.combine(dummy_date, timeval)
    added_datetime = full_datetime + datetime.timedelta(minutes=mins_to_add)
    return added_datetime.time()

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
    
    def save(self, *args, **kwargs):
        if self.startTime >= self.endTime or self.startBreakTime >= self.endBreakTime:
            raise ValidationError('Time error')

        tm = self.startTime
        n = 0

        while tm < self.endTime:
            nextTm = add_mins_to_time(tm, self.minutes)
            if (tm < self.startBreakTime or tm >= self.endBreakTime) and (nextTm <= self.startBreakTime or nextTm >= self.endBreakTime and nextTm <= self.endTime):
                n += 1

            tm = nextTm

        self.places = n

        super().save(*args, **kwargs)