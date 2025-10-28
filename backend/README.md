# Installation

## Set up Virtual Environment
python -m venv .venv

## Activate Virtual Environment
- .\.venv\Scripts\activate (Windows)
- source .venv/bin/activate (macOS/Linux)

## Install Dependencies 
- pip install -r requirements.txt
- python -m uvicorn app.main:app --reload --port 8000



