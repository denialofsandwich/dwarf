### BACKEND
FROM python:3.7 AS dev_backend

ARG UNAME=user
ARG UID=6275
ARG GID=6275
RUN groupadd -g $GID -o $UNAME
RUN useradd -m -u $UID -g $GID -o -s /bin/bash $UNAME

WORKDIR /opt/app
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
USER $UNAME

FROM dev_backend AS dev_backend_core
EXPOSE 8000
ENTRYPOINT ["python3", "manage.py"]
CMD ["runserver", "0.0.0.0:8000"]

FROM dev_backend AS dev_backend_celery_beat
ENTRYPOINT ["celery", "beat", "-A", "backend"]
CMD ["-l", "info"]

FROM dev_backend AS dev_backend_celery_worker
ENTRYPOINT ["celery", "worker", "-A", "backend"]
CMD ["-l", "info"]

### RUN FRONTEND
FROM node:14.8 AS dev_frontend
WORKDIR /opt/app
COPY frontend/package.json package.json
RUN npm install
EXPOSE 3000
ENTRYPOINT ["npm"]
CMD ["run", "dev"]

### WEBSERVER
FROM nginx:1.17 AS dev_web
