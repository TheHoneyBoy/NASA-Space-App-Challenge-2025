from uploaddata.models import UserData
from train.serializer import MLModelSerializer

from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

import pandas as pd
from utils.k2_source import *
# Create your views here.

class MLModelList(APIView):
    """
    List all MLModel, or create a new MLModel.
    """
    permission_classes = [AllowAny]
    def get(self, request, format=None):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        # return Response({"message": "This endpoint is under construction."}, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        # Check if a file is included in the request
        file = request.FILES.get('filePath')
        try:
            # Read CSV file with pandas
            # df = pd.read_csv(file)
            train_data = train_and_select_model(path=file, target="disposition")
            # print(train_data)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        # Improve the serializer and use it to validate and save the data
        serializer = MLModelSerializer(data=request.data)
        if serializer.is_valid():
            instance = serializer.save()  # saves file to storage (MEDIA_ROOT/uploads/)

            # Read the uploaded file using pandas
            # csv_path = instance.filePath.path  # local path to saved CSV
            # df = pd.read_csv(csv_path)
            # print(df)

            # return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(train_data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

"""
{
    "name": "Test Model", # Name of the model
    "fileDataset": <FILE>, # CSV file containing training data 
    "parameters": <FILE> #JSON file containing model hyperparameters
}
"""