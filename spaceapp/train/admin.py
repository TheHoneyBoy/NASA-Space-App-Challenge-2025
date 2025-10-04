# spaceapp/train/admin.py
from django.contrib import admin
from .models import MLModel

@admin.register(MLModel)
class MLModelAdmin(admin.ModelAdmin):
    list_display = ['name', 'date_creation', 'idModel']
    list_filter = ['date_creation']
    search_fields = ['name']