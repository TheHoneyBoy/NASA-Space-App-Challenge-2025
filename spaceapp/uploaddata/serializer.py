from rest_framework import serializers

from accounts.models import *
from accounts.serializers import *

from uploaddata.models import *

class UserDataSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserData
		fields = "__all__"
