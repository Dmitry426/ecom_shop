__all__ = ("Base", "get_session")

from functools import lru_cache

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import declarative_base, sessionmaker

from authorization.core.settings import SQLAlchemySettings

Base = declarative_base()


class AsyncDatabaseSession:
    def __init__(self):
        self._session = None
        self._engine = None

    def __getattr__(self, name):
        return getattr(self._session, name)

    @staticmethod
    def _build_url(cfg: SQLAlchemySettings) -> str:
        """Build database connection URL based on setting."""
        parts = [f"{cfg.connector}://"]

        if cfg.username is not None:
            parts.append(cfg.username)

        if cfg.password is not None:
            parts.append(f":{cfg.password.get_secret_value()}")

        parts.append(f"@{cfg.host}")

        if cfg.port is not None:
            parts.append(f":{cfg.port}")

        if cfg.database_name is not None:
            parts.append(f"/{cfg.database_name}")

        return "".join(parts)

    def init(self, alchemy_settings: SQLAlchemySettings):
        self._engine = create_async_engine(
            self._build_url(alchemy_settings),
            connect_args={'options': '-csearch_path={}'.format('dbschema')},
            future=True,
            echo=True,
        )
        self._session = sessionmaker(
            self._engine, expire_on_commit=False, class_=AsyncSession
        )()

    async def create_all(self):
        async with self._engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)


def get_session() -> AsyncDatabaseSession:
    db = AsyncDatabaseSession()
    return db
