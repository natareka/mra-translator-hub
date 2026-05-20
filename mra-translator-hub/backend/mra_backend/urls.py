from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.shortcuts import render
from django.urls import include, path
from django.views.generic import RedirectView

from .voice_views import TranscribeVoiceView


def home_view(request):
    return render(request, "index.html")

urlpatterns = [
    path("", home_view, name="home"),
    path("favicon.ico", RedirectView.as_view(url="/static/favicon.svg", permanent=True)),
    path("api/transcribe-voice/", TranscribeVoiceView.as_view(), name="transcribe-voice-direct"),
    path("api/transcribe_voice/", TranscribeVoiceView.as_view(), name="transcribe-voice-underscore"),
    path("api/voice/transcribe/", TranscribeVoiceView.as_view(), name="voice-transcribe"),
    path("transcribe-voice/", TranscribeVoiceView.as_view(), name="transcribe-voice-root"),
    path("admin/", admin.site.urls),
    path("api/", include("translator.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)