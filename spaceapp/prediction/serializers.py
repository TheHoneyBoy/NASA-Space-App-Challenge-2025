# spaceapp/predictions/serializers.py
from rest_framework import serializers
from .models import LogUserPredict
import pandas as pd
import json
import os
from pathlib import Path

class PredictionSerializer(serializers.Serializer):
    model_id = serializers.UUIDField(required=True)
    csv_data = serializers.FileField(required=True)
    
    def validate_csv_data(self, value):
        # Validate CSV file
        try:
            temp_dir = Path('../tempdata')
            temp_dir.mkdir(exist_ok=True)
            
            # Create temporary file path
            temp_file_path = temp_dir / value.name

                # Save uploaded file to temporary location
            with open(temp_file_path, 'wb+') as destination:
                for chunk in value.chunks():
                    destination.write(chunk)
            
            df = pd.read_csv(temp_file_path)
        except Exception as e:
            raise serializers.ValidationError(f"Invalid CSV file: {str(e)}")
        return df

class LogUserPredictSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogUserPredict
        fields = '__all__'
        read_only_fields = ('datePrediction',)