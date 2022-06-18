import logging

import uvicorn as uvicorn
from fastapi import FastAPI

from authorization.core.logger import LOGGING
from authorization.core.settings import SQLAlchemySettings, FastApiSettings
from authorization.db.postgres import get_session

app = FastAPI(
    title="ecom_auth",
    docs_url="/api/openapi",
    openapi_url="/api/openapi.json",
)

session = get_session()
session.init(alchemy_settings=SQLAlchemySettings())


@app.on_event("startup")
async def startup():
    await session.create_all()


if __name__ == '__main__':
    url_settings = FastApiSettings()

    uvicorn.run(
        app,
        host=url_settings.host,
        port=url_settings.port,
        log_config=LOGGING,
        log_level=logging.DEBUG,
    )
