from django.urls import path

from .views import SpeakTextView, TranslateFileView, TranslateTextView

urlpatterns = [
    path("translate-text/", TranslateTextView.as_view(), name="translate-text"),
    path("translate-file/", TranslateFileView.as_view(), name="translate-file"),
    path("speak-text/", SpeakTextView.as_view(), name="speak-text"),
]