$ErrorActionPreference = "Stop"

Set-Location "$PSScriptRoot\..\backend"
py -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
if (!(Test-Path .env)) { Copy-Item ..\.env.example .env }
py manage.py migrate
py manage.py runserver