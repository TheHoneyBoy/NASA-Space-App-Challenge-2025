from django.urls import path, include
from uploaddata import views


urlpatterns = [
    path("uploaddata/", views.UserDataList.as_view(), name="uploaddata"),
]