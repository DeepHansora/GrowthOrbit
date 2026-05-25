from app.database.session import Base, engine
from app.models import completed_mission, mission, user
from app.database.session import SessionLocal
from app.services.mission_service import seed_missions_if_empty


def init_db():
    # Creates database tables for all models imported into SQLAlchemy metadata.
    # This is simple and beginner-friendly for SQLite development.
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        seed_missions_if_empty(db)
    finally:
        db.close()
