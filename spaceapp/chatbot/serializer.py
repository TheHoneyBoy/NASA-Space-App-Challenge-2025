from rest_framework import serializers

class ChatbotMessageSerializer(serializers.Serializer):
    user_message = serializers.CharField(required=True, max_length=5000)

    
