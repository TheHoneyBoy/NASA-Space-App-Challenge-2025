from django.db import models
from accounts.models import *

import uuid

# Create your models here.

class UserData(models.Model):
	"""docstring for Data"""
	idUserData = models.UUIDField("Id", primary_key=True, default=uuid.uuid4, editable=False)
	date_creation = models.DateTimeField("Date Created", auto_now_add=True)
	name_dataset =  models.CharField("Name", max_length=100)
	filePath = models.FileField("File", upload_to="datasets/", null=False, blank=False)
	idUser = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name="User")

	class Meta:
		verbose_name_plural = "User datasets"
		verbose_name = "User dataset"

	def __str__(self):
		return self.name_dataset
