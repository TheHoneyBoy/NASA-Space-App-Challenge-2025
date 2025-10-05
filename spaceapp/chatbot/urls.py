# spaceapp/predictions/urls.py
from django.urls import path
from .views import ChatbotViewSet

urlpatterns = [
    path('api/v1/conversation/', ChatbotViewSet.as_view({'post': 'conversation'}), name='chatbot_conversation'),
]