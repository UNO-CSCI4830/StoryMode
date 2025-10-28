# Installation

## Set up Virtual Environment
Create a virtual environmment with 
'python -m venv .venv'

## Activate Virtual Environment
- .venv\Scripts\activate (Windows)
- source .venv/bin/activate (macOS/Linux)

## Install Dependencies & Run
- pip install -r requirements.txt
- python -m uvicorn app.main:app --reload --port 8000



