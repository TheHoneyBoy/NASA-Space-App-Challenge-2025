from uploaddata.models import UserData
from train.serializers import MLModelSerializer

from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

class MLModelList(APIView):
    """
    List all MLModel, or create a new MLModel.
    """
    def get(self, request, format=None):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def post(self, request, format=None):
        serializer = MLModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
