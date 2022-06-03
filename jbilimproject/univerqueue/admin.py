from django.contrib import admin

from .models import University, UniverQueue, QueuePlace, UniverAction, UniverStep, UniverAdmin

admin.site.register([University, UniverQueue, QueuePlace, UniverAction, UniverStep, UniverAdmin])