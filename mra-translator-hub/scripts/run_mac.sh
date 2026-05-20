#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/../backend"
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
if [ ! -f .env ]; then cp ../.env.example .env; fi
python manage.py migrate
python manage.py runserver