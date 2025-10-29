# Installation

## Set up & Activate Virtual Environment 
Create a virtual environmment with:
```bash
python -m venv .venv
```
Then activate it.

Windows:
```bash
.venv\Scripts\activate
```
macOS/Linux:
```bash
source .venv/bin/activate
```
## Install Dependencies & Run
- pip install -r requirements.txt
- python -m uvicorn app.main:app --reload --port 8000



