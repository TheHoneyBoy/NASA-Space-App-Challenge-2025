from rest_framework import serializers

from train.models import *
from train.serializers import *

from train.models import *

class MLModelSerializer(serializers.ModelSerializer):
	class Meta:
		model = MLModel
		fields = "__all__"
