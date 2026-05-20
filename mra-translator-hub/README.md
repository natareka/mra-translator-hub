# MRA Translator Hub

Production-ready starter for a multilingual translator and voice assistant. It includes a Bootstrap frontend, a Django REST Framework backend, SQLite for the MVP, file translation, OCR hooks, TTS MP3 generation, logging, and SMTP notifications.

## Folder Structure

```text
mra-translator-hub/
  .env.example
  README.md
  backend/
    manage.py
    requirements.txt
    mra_backend/
      settings.py
      urls.py
      asgi.py
      wsgi.py
    translator/
      admin.py
      apps.py
      models.py
      serializers.py
      urls.py
      utils.py
      views.py
      migrations/__init__.py
  frontend/
    index.html
    static/css/styles.css
    static/js/app.js
  scripts/
    run_mac.sh
    run_windows.ps1
```

## Windows Setup

```powershell
cd mra-translator-hub\backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy ..\.env.example .env
py manage.py migrate
py manage.py runserver
```

Open `mra-translator-hub/frontend/index.html` in a browser, or serve it with any static server.

## macOS or Linux Setup

```bash
cd mra-translator-hub/backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp ../.env.example .env
python manage.py migrate
python manage.py runserver
```

Open `mra-translator-hub/frontend/index.html` in a browser, or serve it with any static server.

## Tesseract OCR Install

Windows:
Download and install Tesseract from the UB Mannheim Windows build, then set `TESSERACT_CMD` in `.env` to the installed `tesseract.exe` path.

macOS:
```bash
brew install tesseract
```

Ubuntu/Debian:
```bash
sudo apt update
sudo apt install tesseract-ocr
```

## API Routes

`POST /api/translate-text/`

```json
{
  "source_text": "Hello",
  "source_lang": "auto",
  "target_lang": "ta"
}
```

`POST /api/translate-file/`

Use `multipart/form-data` with `file`, `source_lang`, `target_lang`, and optional `user_email`.

`POST /api/speak-text/`

```json
{
  "text": "வணக்கம்",
  "lang": "ta"
}
```

## Notes

- SQLite is configured for the MVP and can be swapped to MySQL in `backend/mra_backend/settings.py`.
- `deep-translator` uses Google Translate wrapper behavior without an API key. For high-volume production, replace it with an official translation provider.
- File extraction supports TXT, PDF, DOCX, PPTX, JPG, JPEG, and PNG.
- The frontend uses the browser Web Speech API where available. Chrome and Edge provide the best support.