# StoryMode Integration Guide

## Dev: Backend
cd backend

python -m venv .venv && . .venv/bin/activate

pip install -r requirements.txt

cp .env.example .env

uvicorn app.main:app --reload

## Dev: Frontend
cp .env.example .env

npm i

npm run dev

## Docker
docker compose up --build
