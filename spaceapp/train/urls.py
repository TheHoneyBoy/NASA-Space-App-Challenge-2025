# spaceapp/predictions/urls.py
from django.urls import path
from .views import MLModelList

urlpatterns = [
    path('api/v1/train/', MLModelList.as_view(), name="train"),
]