from django.contrib import admin

from .models import University, UniverQueue, QueuePlace

admin.site.register([University, UniverQueue, QueuePlace,])