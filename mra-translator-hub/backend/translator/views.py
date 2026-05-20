from rest_framework import status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import TranslationLog
from .serializers import TranslationLogSerializer
from .utils import create_tts_mp3, extract_text, save_translated_file, send_admin_email, translate_text


class TranslateTextView(APIView):
    def post(self, request):
        source_text = request.data.get("source_text", "")
        source_lang = request.data.get("source_lang", "auto")
        target_lang = request.data.get("target_lang", "ta")
        user_email = request.data.get("user_email", "")

        try:
            translated_text = translate_text(source_text, source_lang, target_lang)
            log = TranslationLog.objects.create(
                user_email=user_email,
                source_text=source_text,
                target_text=translated_text,
                source_lang=source_lang,
                target_lang=target_lang,
                status="success",
            )
            return Response({"translated_text": translated_text, "log": TranslationLogSerializer(log).data})
        except Exception as exc:
            TranslationLog.objects.create(
                user_email=user_email,
                source_text=source_text,
                source_lang=source_lang,
                target_lang=target_lang,
                status="failed",
                error_message=str(exc),
            )
            return Response({"error": str(exc)}, status=status.HTTP_400_BAD_REQUEST)


class TranslateFileView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        uploaded_file = request.FILES.get("file")
        source_lang = request.data.get("source_lang", "auto")
        target_lang = request.data.get("target_lang", "ta")
        user_email = request.data.get("user_email", "")

        if not uploaded_file:
            return Response({"error": "file is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            extracted_text = extract_text(uploaded_file)
            if not extracted_text:
                raise ValueError("No text could be extracted from the file")
            translated_text = translate_text(extracted_text, source_lang, target_lang)
            download_name, download_url = save_translated_file(uploaded_file.name, translated_text)
            send_admin_email(uploaded_file.name, source_lang, target_lang, "success", user_email)
            log = TranslationLog.objects.create(
                user_email=user_email,
                source_text=extracted_text[:10000],
                target_text=translated_text[:10000],
                source_lang=source_lang,
                target_lang=target_lang,
                file_name=uploaded_file.name,
                status="success",
            )
            return Response(
                {
                    "message": "Translation complete. Email sent to admin.",
                    "download_name": download_name,
                    "download_url": request.build_absolute_uri(download_url),
                    "extracted_preview": extracted_text[:800],
                    "log": TranslationLogSerializer(log).data,
                }
            )
        except Exception as exc:
            send_admin_email(uploaded_file.name, source_lang, target_lang, "failed", user_email)
            TranslationLog.objects.create(
                user_email=user_email,
                source_lang=source_lang,
                target_lang=target_lang,
                file_name=uploaded_file.name,
                status="failed",
                error_message=str(exc),
            )
            return Response({"error": str(exc)}, status=status.HTTP_400_BAD_REQUEST)


class SpeakTextView(APIView):
    def post(self, request):
        text = request.data.get("text", "")
        lang = request.data.get("lang", "ta")
        try:
            file_name, audio_url = create_tts_mp3(text, lang)
            return Response({"file_name": file_name, "audio_url": request.build_absolute_uri(audio_url)})
        except Exception as exc:
            return Response({"error": str(exc)}, status=status.HTTP_400_BAD_REQUEST)