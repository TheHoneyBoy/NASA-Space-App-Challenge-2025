from django.db import models
from accounts.models import *

import uuid

# Create your models here.

class MLModel(models.Model):
	"""docstring for MLModel"""
	idModel = models.UUIDField("Id", primary_key=True, default=uuid.uuid4, editable=False)
	dateCreate = models.DateTimeField("Date Created", auto_now_add=True)
	name =  models.CharField("Name", max_length=100)
	filePath = models.FileField("File", upload_to="files/datasets/", null=False, blank=False)
	parameters = models.FileField("Parameters", upload_to="files/models/", null=False, blank=False)
	
	class Meta:
		verbose_name_plural = "ML Models"
		verbose_name = "ML Model"

	def __str__(self):
		return self.name
