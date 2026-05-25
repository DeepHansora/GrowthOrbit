from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Central place for environment variables used by the backend.
    # Values come from backend/.env when that file exists.
    APP_NAME: str = "GrowthOrbit"
    DATABASE_URL: str = "sqlite:///./growthorbit.db"
    FRONTEND_ORIGIN: str = "http://localhost:5173"
    JWT_SECRET_KEY: str = "change-this-secret-key-before-production"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings()
