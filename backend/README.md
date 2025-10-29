# Installation

## Set up & Activate Virtual Environment 
Create a virtual environmment with:
```bash
python -m venv .venv
```
Then activate it:
```bash
.venv\Scripts\activate (Windows)
```
```bash
source .venv/bin/activate (macOS/Linux)
```
## Install Dependencies & Run
- pip install -r requirements.txt
- python -m uvicorn app.main:app --reload --port 8000



