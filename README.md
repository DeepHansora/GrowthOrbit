# GrowthOrbit

GrowthOrbit is a modern AI SaaS starter project with a React + Vite frontend and a FastAPI backend. This setup is intentionally small and beginner-readable so features can be added safely later.

## Tech Stack

Frontend:
- React + Vite
- TailwindCSS
- Framer Motion
- React Router

Backend:
- Python FastAPI
- SQLite
- SQLAlchemy
- Pydantic
- JWT authentication later

## Project Structure

```text
GrowthOrbit/
  frontend/
    src/
      components/   Reusable UI pieces like buttons, cards, navbars
      pages/        Route-level screens such as the landing page
      layouts/      Shared page wrappers used by multiple routes
      services/     API client functions that talk to the backend
      context/      Shared React state providers for future auth/app state
      animations/   Reusable Framer Motion animation settings
      assets/       Images, icons, and static frontend assets
  backend/
    app/
      routes/       API route files grouped by feature
      models/       SQLAlchemy database models
      schemas/      Pydantic request and response schemas
      services/     Business logic that routes can call
      utils/        Helper functions used across the backend
      database/     SQLite engine, sessions, and database setup
      config/       Environment settings and app configuration
```

## Setup

### 1. Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at:

```text
http://localhost:5173
```

Create a local environment file:

```bash
cp .env.example .env
```

### 2. Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The backend runs at:

```text
http://localhost:8000
```

Create a local environment file:

```bash
copy .env.example .env
```

## Frontend and Backend Flow

1. The user opens the React app in the browser.
2. React Router decides which page to show.
3. Frontend service files call the backend API using `fetch`.
4. FastAPI receives the request through route files.
5. Routes call services for business logic.
6. Services can use the SQLite database through SQLAlchemy sessions.
7. FastAPI sends JSON back to React.

For example, the landing page calls:

```text
GET http://localhost:8000/health
```

That confirms the backend is running and the frontend can reach it.

## Notes

- JWT authentication is not implemented yet. The folders are ready for it later.
- SQLite is used for simple local development.
- Keep feature code grouped by responsibility: UI in frontend folders, API logic in backend route/service/model/schema folders.
