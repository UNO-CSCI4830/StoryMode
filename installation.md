# StoryMode Installation Guide

## Non-Docker:
### Dev: Backend
cd backend

python -m venv .venv && . .venv/bin/activate

pip install -r requirements.txt

cp .env.example .env

uvicorn app.main:app --reload


### Dev: Frontend
cp .env.example .env

npm i

npm run dev

---
## Docker
docker compose up --build


### Open a Terminal Locally

#### **Make sure you have docker installed first: https://www.docker.com/products/docker-desktop/**
You can check if you have it installed by getting the version inside your terminal:
```bash
docker --version
```
Once Docker is installed you can run StoryMode using the command below.

#### To run:
```bash
docker compose up --build
```

#### To clear data:
```bash
docker compose down -v
```
