from pydantic import BaseSettings, SecretStr


class SQLAlchemySettings(BaseSettings):
    """Represents SqlAlchemy  settings."""

    class Config:
        env_prefix = "SQLALCHEMY_"

    connector: str = "postgresql"
    host: str = "postgres"
    port: int = 5432
    username: str = "postgres"
    password: SecretStr = "pgpassword"
    database_name: str = "auth_db"


class RedisSettings(BaseSettings):
    """Represents Redis settings."""

    class Config:
        env_prefix = "REDIS_"

    host: str = "redis"
    port: int = 6379
    db: int = 0


class FastApiSettings(BaseSettings):
    """Represents Flask settings."""

    class Config:
        env_prefix = "API_AUTH"

    host: str = "0.0.0.0"
    port: int = 4000
    debug: bool = True
    redirect_uri: str = "localhost"


class JWTSettings(BaseSettings):
    """Represents JWT settings."""

    class Config:
        env_prefix = "JWT"

    secret: str = None
    access_exp: int = 60
    refresh_exp: int = 7
