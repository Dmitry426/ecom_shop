import asyncpg
import backoff

from core.settings import SQLAlchemySettings

postgres_settings = SQLAlchemySettings()

@backoff.on_exception(
    wait_gen=backoff.expo,
    exception=(RuntimeError, TimeoutError, ConnectionError),
    max_time=postgres_settings.max_backoff,
)
async def postgres_connect():
    pool = await asyncpg.create_pool(
        user=postgres_settings.username,
        password=postgres_settings.password,
        host=postgres_settings.host,
        port=postgres_settings.port,
        database=postgres_settings.database_name,
        max_inactive_connection_lifetime=100,
    )
    return pool
