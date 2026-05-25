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
- Signup: `POST http://localhost:8000/signup`
- Login: `POST http://localhost:8000/login`
- Current user: `GET http://localhost:8000/me`
- Dashboard: `GET http://localhost:8000/dashboard`
- Missions: `GET http://localhost:8000/missions`
- Complete mission: `POST http://localhost:8000/missions/complete/{mission_id}`
- API docs: `http://localhost:8000/docs`

## Notes

- SQLite is initialized automatically when the app starts.
- Authentication includes basic signup and login routes.
- Dashboard and mission routes require `Authorization: Bearer <token>`.
- CORS is configured for the React frontend at `http://localhost:5173`.
