## БАЗОВЫЙ ОБРАЗ
FROM python:3.9.10-slim AS python-base
WORKDIR /usr/src/app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update && \
    apt-get install --no-install-recommends -y gcc netcat && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
RUN pip install --upgrade pip

# Установка зависимостей
COPY /requirements.txt .
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /usr/src/app/wheels -r requirements.txt


## СБОРКА
FROM python-base as development

# Создаем пользователя
RUN mkdir -p /home/app
RUN adduser --system --group app

# Создаем переменные окружения
ENV PYTHONUNBUFFERED 1
ENV HOME=/home/app
ENV APP_HOME=/home/app/src
ENV APP_LOGS=/home/app/logs

# Создаем необходимые директории
RUN mkdir $APP_HOME
RUN mkdir $APP_LOGS
WORKDIR $APP_HOME

# Устанавливаем зависимости
RUN apt-get update && \
    apt-get install --no-install-recommends -y netcat gettext
COPY --from=python-base /usr/src/app/wheels /wheels
RUN pip install --no-cache /wheels/*


# Изменяем владельца файлов на app
RUN chown -R app:app $APP_HOME
RUN chown -R app:app $APP_LOGS

# Переключаемся на пользователя app
USER app

FROM python-base as production

# Создаем пользователя
RUN mkdir -p /home/app
RUN adduser --system --group app

# Создаем переменные окружения
ENV PYTHONUNBUFFERED 1
ENV HOME=/home/app
ENV APP_HOME=/home/app/src
ENV APP_LOGS=/home/app/logs

# Создаем необходимые директории
RUN mkdir $APP_HOME
RUN mkdir $APP_LOGS
WORKDIR $APP_HOME

COPY /src/app $APP_HOME/app
COPY /src/migrations $APP_HOME/migrations
COPY /src/gevent_runner.py $APP_HOME/gevent_runner.py

# Устанавливаем зависимости
COPY --from=python-base /usr/src/app/wheels /wheels
RUN pip install --no-cache /wheels/*


# Изменяем владельца файлов на app
RUN chown -R app:app $APP_HOME
RUN chown -R app:app $APP_LOGS

# Переключаемся на пользователя app
USER app

CMD uwsgi --master \
  --single-interpreter \
  --workers $WORKERS \
  --gevent $ASYNC_CORES \
  --protocol $PROTOCOL \
  --socket 0.0.0.0:$PORT_APP \
  --module gevent_runner:application
