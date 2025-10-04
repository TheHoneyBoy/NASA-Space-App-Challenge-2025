# spaceapp/predictions/views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import pandas as pd
import json
import joblib
import numpy as np
from datetime import datetime
from .models import LogUserPredict
from .serializers import PredictionSerializer, LogUserPredictSerializer

class PredictionViewSet(viewsets.ModelViewSet):
    queryset = LogUserPredict.objects.all()
    serializer_class = LogUserPredictSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def predict(self, request):
        serializer = PredictionSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Step 1: Get model and data
            model_id = serializer.validated_data['model_id']
            csv_file = serializer.validated_data['csv_data']
            
            # Get the model instance from train app
            from train.models import Model as TrainModel
            try:
                ml_model_instance = TrainModel.objects.get(idModel=model_id)
            except TrainModel.DoesNotExist:
                return Response(
                    {"error": "Model not found"}, 
                    status=status.HTTP_404_NOT_FOUND
                )
            
            # Step 2: Load ML model and make predictions
            df = pd.read_csv(csv_file)
            
            # Load the trained model from filePath
            try:
                model = joblib.load(ml_model_instance.filePath)
            except Exception as e:
                return Response(
                    {"error": f"Failed to load model: {str(e)}"}, 
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            
            # Make predictions
            predictions = model.predict(df)
            
            # Calculate metrics (example metrics - adjust based on your model type)
            metrics = self.calculate_metrics(model, df, predictions)
            
            # Convert predictions to string result
            result = self.format_predictions(predictions)
            
            # Step 3: Store prediction log
            prediction_log = LogUserPredict.objects.create(
                data=df.to_dict(orient='records'),  # Convert DataFrame to JSON-serializable format
                metrics=metrics,
                result=result,
                idUser=request.user,
                idModel=ml_model_instance
            )
            
            # Prepare response
            response_data = {
                'prediction_id': prediction_log.id,
                'predictions': predictions.tolist(),
                'metrics': metrics,
                'result': result
            }
            
            return Response(response_data, status=status.HTTP_200_OK)
            
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
            return str(predictions[0])[:45]
        else:
            unique_preds = np.unique(predictions)
            if len(unique_preds) == 1:
                return f"All: {unique_preds[0]}"[:45]
            else:
                return f"{len(predictions)} predictions"[:45]