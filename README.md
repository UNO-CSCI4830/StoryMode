# StoryMode
A web application for creating and managing book clubs


## How to Run
Terminal 1:

cd StoryMode-main/backend

python -m venv venv

venv\Scripts\Activate   # For linux/MAC: venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload


Terminal 2:

cd StoryMode-main

cp .env.example .env

npm install

npm run dev


Website: http://localhost:5173/

Docs (backend): http://127.0.0.1:8000/docs
