import io
import wave

from rest_framework import status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView

try:
    import speech_recognition as sr
except ImportError:
    sr = None


def read_wav_audio(uploaded_file):
    audio_bytes = uploaded_file.read()
    if not audio_bytes:
        raise ValueError("Recorded audio is empty. Try recording again.")

    try:
        with wave.open(io.BytesIO(audio_bytes), "rb") as wav_file:
            channels = wav_file.getnchannels()
            sample_width = wav_file.getsampwidth()
            sample_rate = wav_file.getframerate()
            frame_count = wav_file.getnframes()
            frame_data = wav_file.readframes(frame_count)
    except wave.Error as exc:
        raise ValueError(f"Invalid WAV audio received: {exc}") from exc

    if channels != 1:
        raise ValueError("Voice recorder must send mono audio. Please refresh and try again.")
    if sample_width not in {1, 2, 4}:
        raise ValueError(f"Unsupported audio sample width: {sample_width}")
    if sample_rate <= 0 or frame_count <= 0:
        raise ValueError("Recorded audio has no usable samples.")

    duration = frame_count / sample_rate
    if duration < 0.7:
        raise ValueError("Recording is too short. Speak for at least one second, then stop recording.")

    return sr.AudioData(frame_data, sample_rate, sample_width), round(duration, 2)


def recognize_audio_data(audio_data, language):
    recognizer = sr.Recognizer()
    recognizer.energy_threshold = 180
    recognizer.dynamic_energy_threshold = True

    normalized_audio = sr.AudioData(
        audio_data.get_raw_data(convert_rate=16000, convert_width=2),
        16000,
        2,
    )

    attempts = []
    for lang in [language, "en-US"]:
        if lang and lang not in attempts:
            attempts.append(lang)

    last_error = None
    had_unknown_value = False
    for lang in attempts:
        try:
            transcript = recognizer.recognize_google(normalized_audio, language=lang)
            if transcript:
                return transcript, lang
        except sr.UnknownValueError:
            had_unknown_value = True
        except sr.RequestError as exc:
            last_error = exc

    try:
        transcript = recognizer.recognize_sphinx(normalized_audio)
        if transcript:
            return transcript, "en-US-offline"
    except sr.UnknownValueError:
        had_unknown_value = True
    except sr.RequestError as exc:
        if last_error is None:
            last_error = exc

    if last_error:
        raise sr.RequestError(
            f"Online speech recognition failed ({last_error}) and offline fallback is unavailable. Run: python -m pip install pocketsphinx"
        )
    if had_unknown_value:
        raise sr.UnknownValueError()
    raise sr.UnknownValueError()


class TranscribeVoiceView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        if sr is None:
            return Response(
                {"error": "SpeechRecognition is not installed. Run: python -m pip install SpeechRecognition"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        audio_file = request.FILES.get("audio")
        language = request.data.get("language", "en-US") or "en-US"
        if language == "auto":
            language = "en-US"

        if not audio_file:
            return Response({"error": "audio file is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            audio_data, duration = read_wav_audio(audio_file)
            transcript, used_language = recognize_audio_data(audio_data, language)

            return Response({"transcript": transcript, "language": used_language, "duration": duration})
        except sr.UnknownValueError:
            return Response({"error": "No clear speech detected. Try again closer to the microphone."}, status=status.HTTP_400_BAD_REQUEST)
        except sr.RequestError as exc:
            return Response({"error": f"Speech recognition service error: {exc}"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as exc:
            return Response({"error": str(exc)}, status=status.HTTP_400_BAD_REQUEST)