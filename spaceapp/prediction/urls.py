# spaceapp/predictions/urls.py
from django.urls import path
from .views import PredictionViewSet

urlpatterns = [
    path('api/v1/predict/', PredictionViewSet.as_view({'post': 'predict'}), name='predict'),
]