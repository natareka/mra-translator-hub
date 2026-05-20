from rest_framework import serializers

from .models import TranslationLog


class TranslationLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = TranslationLog
        fields = [
            "id",
            "user_email",
            "source_text",
            "target_text",
            "source_lang",
            "target_lang",
            "file_name",
            "status",
            "error_message",
            "created_at",
        ]