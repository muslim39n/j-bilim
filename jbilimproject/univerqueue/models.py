from django.db import models

import datetime
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User 

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
    city_kz = models.CharField(max_length=256, default="Белгісіз")
    image_url = models.CharField(max_length=512, default="none")

    def __str__(self):
        return self.name_kz
    

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

    def timeSlices(self, places):
        tm = self.startTime
        sl = []
        i = 1

        while tm < self.endTime:
            nextTm = add_mins_to_time(tm, self.minutes)
            
            if (tm < self.startBreakTime or tm >= self.endBreakTime) and (nextTm <= self.startBreakTime or nextTm >= self.endBreakTime and nextTm <= self.endTime):
                isFree = True
                place = None
                for j in places:
                    if j['n'] == i:
                        isFree = False
                        place = j
                        break
                    
                sl.append({'start': tm, 'end': nextTm, 'isFree': isFree, 'place': place, 'i': i})
                i += 1
            
            tm = nextTm

        return sl
            
        

class QueuePlace(models.Model):
    date = models.DateField()
    queue = models.ForeignKey(UniverQueue, on_delete=models.CASCADE)
    fullname = models.CharField(max_length=256)
    n = models.PositiveSmallIntegerField()
    
class UniverAction(models.Model):
    univer = models.ForeignKey(University, on_delete=models.CASCADE)
    title = models.CharField(max_length=256)

    def __str__(self):
        return  self.title + ' <> ' + str(self.univer)


class UniverStep(models.Model):
    univer_action = models.ForeignKey(UniverAction, on_delete=models.CASCADE)
    title = models.CharField(max_length=256)
    description = models.TextField()
    method = models.CharField(max_length=12,
                                choices=[
                                    ('online', 'Онлайн документ тапсыру'),
                                    ('offline', 'Университетке келу'),
                                    ('queue', 'Кезекке тұру'),
                                    ('none', 'Ешқандай'),
                                ], default='none')
    color = models.CharField(max_length=12,
                                choices=[
                                    ('kok', 'Көк'),
                                    ('sary', 'Сары'),
                                    ('jasyl', 'Жасыл'),
                                ])
    
class UniverAdmin(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    univer = models.ForeignKey(University, on_delete=models.CASCADE)
    