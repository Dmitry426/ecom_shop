import uuid

from datetime import datetime

from sqlalchemy import UniqueConstraint, Column, ForeignKey, String, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship, backref

from passlib.context import CryptContext

from authorization.db.postgres import Base

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class User(Base):
    __tablename__ = "users"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        unique=True,
        nullable=False,
    )
    login = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    email = Column(String, nullable=False)
    is_superuser = Column(Boolean, unique=False, default=False)

    def __repr__(self):
        return f"<User {self.login}>"

    def get_password_hash(self):
        return pwd_context.hash(self.password)

    def verify_password(self, plain_password):
        return pwd_context.verify(plain_password, self.password)


class Session(Base):
    __tablename__ = "sessions"
    __table_args__ = (
        UniqueConstraint("id", "auth_date"),
        {
            "postgresql_partition_by": "Range (auth_date)",
        },
    )

    id = Base.Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        nullable=False,
    )
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    user = relationship("User", backref=backref("sessions", lazy=True))
    user_agent = Column(Base.String)
    auth_date = Column(
        Base.DateTime,
        nullable=False,
        default=datetime.utcnow,
        primary_key=True,
    )

    def __repr__(self):
        return f"<Session User {self.user.login}>"
