from django.db import models


class TranslationLog(models.Model):
    STATUS_CHOICES = [
        ("success", "Success"),
        ("failed", "Failed"),
    ]

    user_email = models.EmailField(blank=True)
    source_text = models.TextField(blank=True)
    target_text = models.TextField(blank=True)
    source_lang = models.CharField(max_length=24, default="auto")
    target_lang = models.CharField(max_length=24, default="ta")
    file_name = models.CharField(max_length=255, blank=True)
    status = models.CharField(max_length=16, choices=STATUS_CHOICES, default="success")
    error_message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        item = self.file_name or self.source_text[:40] or "Translation"
        return f"{item} -> {self.target_lang} ({self.status})"