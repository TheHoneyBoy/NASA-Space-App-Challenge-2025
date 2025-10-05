# spaceapp/predictions/views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny

import pandas as pd
import json
import joblib
import numpy as np
from datetime import datetime
from .models import LogUserPredict
from .serializers import PredictionSerializer, LogUserPredictSerializer
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

# @method_decorator(csrf_exempt, name='dispatch')
class PredictionViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = LogUserPredict.objects.all()
    serializer_class = LogUserPredictSerializer

    @action(detail=False, methods=['post'])
    def predict(self, request):
        serializer = PredictionSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Step 1: Get model and data
            validated_data = serializer.validated_data
            model_id = validated_data['model_id']
            csv_data_list = validated_data['csv_data']

            print(csv_data_list.shape)          # Get the model instance from train app - UPDATED REFERENCE
            from train.models import MLModel  # Changed from Model to MLModel
            try:
                ml_model_instance = MLModel.objects.get(idModel=model_id)  # Changed variable name for clarity
            except MLModel.DoesNotExist:  # Updated exception
                return Response(
                    {"error": "Model not found"}, 
                    status=status.HTTP_404_NOT_FOUND
                )
            
            # Step 2: Load ML model and make predictions
            
            # Load the trained model from filePath
            try:
                # Note: filePath is a FileField, so use .path to get the file system path
                model = joblib.load(ml_model_instance.filePath.path)
            except Exception as e:
                return Response(
                    {"error": f"Failed to load model: {str(e)}"}, 
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            
            # Make predictions
            predictions = model.predict(csv_data_list.values)


            # NEW: Get prediction probabilities and map to labels
            # Get probabilities for each class
            probabilities = model.predict_proba(csv_data_list.values)
            
            # Map numerical predictions to string labels
            label_map = {
                0: "FALSE POSITIVE",
                1: "CANDIDATE", 
                2: "CONFIRMED"
            }
            
            # Prepare the response data using the index from csv_data_list
            response_data = []
            for i, (pred, prob) in enumerate(zip(predictions, probabilities)):
                # Get the predicted class probability (max probability for the predicted class)
                predicted_prob = prob[pred]  # Probability of the predicted class
                
                response_data.append({
                    "name": str(csv_data_list.index[i]),  # Use the actual index from csv_data_list
                    "prediction": label_map[pred],
                    "probability": f"{predicted_prob:.2%}"  # Format as percentage with 2 decimal places
                })
            
            # # Calculate metrics
            # metrics = self.calculate_metrics(model, df, predictions)
            
            # # Convert predictions to string result
            # result = self.format_predictions(predictions)
            
            # # Step 3: Store prediction log
            # prediction_log = LogUserPredict.objects.create(
            #     data=df.to_dict(orient='records'),
            #     metrics=metrics,
            #     result=result,
            #     idUser=request.user,
            #     idModel=ml_model_instance  # This should now work
            # )
            
            # Prepare response
            response = {
                'predictions': response_data,
                'total_predictions': len(predictions),
                'message': 'Prediction successful'  
            }

            return Response(response, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response(
                {"error": f"Prediction failed: {str(e)}"}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def calculate_metrics(self, model, df, predictions):
        """Calculate prediction metrics based on model type"""
        metrics = {}
        
        try:
            # Example metrics for different model types
            if hasattr(model, 'predict_proba'):
                # Classification model
                probabilities = model.predict_proba(df)
                metrics['confidence_scores'] = probabilities.max(axis=1).tolist()
                metrics['prediction_counts'] = {
                    str(label): int(count) 
                    for label, count in zip(*np.unique(predictions, return_counts=True))
                }
            else:
                # Regression model
                metrics['statistics'] = {
                    'mean': float(np.mean(predictions)),
                    'std': float(np.std(predictions)),
                    'min': float(np.min(predictions)),
                    'max': float(np.max(predictions))
                }
            
            metrics['total_predictions'] = len(predictions)
            metrics['timestamp'] = datetime.now().isoformat()
            
        except Exception as e:
            metrics['error'] = f"Metrics calculation failed: {str(e)}"
        
        return metrics
    
    def format_predictions(self, predictions):
        """Format predictions into a string result (max 45 chars)"""
        if len(predictions) == 1:
            return str(predictions[0])
        else:
            unique_preds = np.unique(predictions)
            if len(unique_preds) == 1:
                return f"All: {unique_preds[0]}"
            else:
                return f"{len(predictions)} predictions"