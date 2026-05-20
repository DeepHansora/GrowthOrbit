from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from app.config.settings import settings

connect_args = {}

if settings.DATABASE_URL.startswith("sqlite"):
    # SQLite needs this option because FastAPI can handle requests in different threads.
    connect_args = {"check_same_thread": False}

engine = create_engine(settings.DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    # All SQLAlchemy models will inherit from this base class.
    pass


def get_db():
    # Creates one database session per request, then closes it after the request finishes.
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
