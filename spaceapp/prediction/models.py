# spaceapp/predictions/models.py
from django.db import models
from django.conf import settings

class LogUserPredict(models.Model):
    datePrediction = models.DateTimeField(auto_now_add=True)
    data = models.JSONField()
    metrics = models.JSONField(null=True, blank=True)
    result = models.CharField(max_length=45)
    idUser = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        db_column='idUser'
    )
    idModel = models.ForeignKey(
        'train.MLModel',  # Changed from 'train.Model' to 'train.MLModel'
        on_delete=models.CASCADE,
        db_column='idModel'
    )

    class Meta:
        db_table = 'LogUserPredict'

    def __str__(self):
        return f"Prediction {self.id} by User {self.idUser_id}"