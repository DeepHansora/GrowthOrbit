from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config.settings import settings
from app.database.init_db import init_db
from app.routes import auth, dashboard, health, missions, resume


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Automatically creates the SQLite database file and tables when the API starts.
    init_db()
    yield


app = FastAPI(title=settings.APP_NAME, lifespan=lifespan)

# Allow the React frontend to call the FastAPI backend in local development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_ORIGIN],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, tags=["Health"])
app.include_router(auth.router, tags=["Authentication"])
app.include_router(dashboard.router, tags=["Dashboard"])
app.include_router(missions.router, tags=["Missions"])
app.include_router(resume.router, tags=["Resume Analysis"])


@app.get("/")
def root():
    return {"message": "GrowthOrbit API is running"}
