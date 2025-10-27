\### Create and Activate a Virtual Environment



```bash

\# Create a virtual environment

python -m venv .venv



\# Activate it (Windows)

.\\.venv\\Scripts\\activate



\# Activate it (macOS / Linux)

source .venv/bin/activate



\# Install Dependencies

pip install -r requirements.txt



\# Run FastAPI Server

python -m uvicorn app.main:app --reload --port 8000



