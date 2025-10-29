# Installation

## Set Up Virtual Environment 
Create a virtual environment with:
```bash
python -m venv .venv
```
## Activate Virtual Environment 
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



