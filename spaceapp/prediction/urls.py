# spaceapp/predictions/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PredictionViewSet

router = DefaultRouter()
router.register(r'predictions', PredictionViewSet, basename='predictions')

urlpatterns = [
    path('', include(router.urls)),
]