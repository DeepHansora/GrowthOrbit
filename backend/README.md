# GrowthOrbit Backend

FastAPI backend foundation for GrowthOrbit using SQLite and SQLAlchemy.

## Setup

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --reload
```

## Local URLs

- API root: `http://localhost:8000`
- Health check: `http://localhost:8000/health`
- API docs: `http://localhost:8000/docs`

## Notes

- SQLite is initialized automatically when the app starts.
- Authentication is not implemented yet.
- CORS is configured for the React frontend at `http://localhost:5173`.
