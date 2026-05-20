from django.contrib import admin

from .models import TranslationLog


@admin.register(TranslationLog)
class TranslationLogAdmin(admin.ModelAdmin):
    list_display = ("id", "file_name", "source_lang", "target_lang", "status", "user_email", "created_at")
    list_filter = ("status", "source_lang", "target_lang", "created_at")
    search_fields = ("source_text", "target_text", "file_name", "user_email")
    readonly_fields = ("created_at",)