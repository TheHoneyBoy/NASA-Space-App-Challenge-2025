# spaceapp/predictions/serializers.py
from rest_framework import serializers
from .models import LogUserPredict
import pandas as pd
import json

class PredictionSerializer(serializers.Serializer):
    model_id = serializers.IntegerField(required=True)
    csv_data = serializers.FileField(required=True)
    
    def validate_csv_data(self, value):
        # Validate CSV file
        try:
            df = pd.read_csv(value)
            if df.empty:
                raise serializers.ValidationError("CSV file is empty")
        except Exception as e:
            raise serializers.ValidationError(f"Invalid CSV file: {str(e)}")
        return value

class LogUserPredictSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogUserPredict
        fields = '__all__'
        read_only_fields = ('datePrediction',)