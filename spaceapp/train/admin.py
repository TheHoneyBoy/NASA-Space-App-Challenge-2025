# spaceapp/train/admin.py
from django.contrib import admin
from .models import MLModel

@admin.register(MLModel)
class MLModelAdmin(admin.ModelAdmin):
    list_display = ['name', 'dateCreate', 'idModel']
    list_filter = ['dateCreate']
    search_fields = ['name']