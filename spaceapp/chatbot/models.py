from django.db import models
import uuid

# Create your models here.
class Chatbot(models.Model):
    idChatbot = models.UUIDField("Id", primary_key=True, default=uuid.uuid4, editable=False)
    name  = models.CharField("Name", max_length=30)
    chatbot_info = models.JSONField("Chatbot Info", null=True, blank=True)

    class Meta: 
        verbose_name_plural = "Chatbots"
        verbose_name = "Chatbot"

    def __str__(self):
        return self.name
