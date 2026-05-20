from app.database.session import Base, engine


def init_db():
    # Creates database tables for all models imported into SQLAlchemy metadata.
    # This is simple and beginner-friendly for SQLite development.
    Base.metadata.create_all(bind=engine)

