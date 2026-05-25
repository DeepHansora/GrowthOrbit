from datetime import datetime, timezone

from sqlalchemy import DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.session import Base


class CompletedMission(Base):
    __tablename__ = "completed_missions"
    __table_args__ = (
        UniqueConstraint("user_id", "mission_id", name="unique_user_mission_completion"),
    )

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    mission_id: Mapped[int] = mapped_column(ForeignKey("missions.id"), index=True)
    completed_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
    )

    # These relationships let us access completion.user and completion.mission.
    user: Mapped["User"] = relationship(back_populates="completed_missions")
    mission: Mapped["Mission"] = relationship(back_populates="completed_by")

