# DWARF
"Django with a React frontend" is a dockerized frontend and backend template.

## Overview
### Why?
Almost every web application needs the same essential features, like authentication.
This template already implemented the most basic features,
so you can just start coding the important things.

### Used Software
- Django (Backend)
  - Celery (Background Jobs)
  - Channels (WebSockets)
  - Django REST Framework (API Requests)
- React NextJS (Frontend)
  - Material UI (UI Components)
  - Workbox (Offline Capabillity)

### Prepared Features
- Authentication
  - Permissions
- UI Skeleton
  - Prepared themes
  - Pagination with a customizable sidebar
  - Login Page
- Persistant React States via
  - LocalStorage
  - URL Query Args
- WebSockets
- Dockerization
  - Prod and dev environment with Docker Compose
- Service Worker
  - Offline Capabillity
  - Push Notifications
  - Installable Progressive Web App
- Development environment

## Setup
### Requirements
You need:
- Docker
- Docker Compose
- Linux OS

### Installation

If you have cloned this repository and moved into the directory,
you have to set the UID for every file:
```
chown 6275:6275 -R *
```

After that, you can start the development environment with:
```
./start_env.sh
```

This command sets some aliases and starts Eclipse Theia,
which is a webbased IDE with the look and feel of VS Code.
Is is accessible at http://localhost:3333

If you see a \[dwarf\] prefix in your shell, you can start the actual template.
All you have to do is type `dev` in the shell, and it will build and start the environment for you.

Once everything is started, you can start coding.

## Help
Examples and a more detailed Documentation will follow soon.