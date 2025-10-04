from django.urls import path, include
from rest_framework import routers
from accounts import views
from rest_framework.authtoken.views import obtain_auth_token

router = routers.DefaultRouter()
router.register(r'user', views.UserView, 'user')

urlpatterns = [
    path("api/v1/", include(router.urls)),
    # For token authentication
    path('api/v1/auth-token/', obtain_auth_token, name='auth_token'),
]