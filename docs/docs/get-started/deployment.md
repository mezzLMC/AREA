---
sidebar_position: 3
---

# Deployment

Deploying the project is a simple process that can be done in a few steps using docker-compose. This guide will walk you through the process of deploying the project to a production environment.

## Prerequisites

- Docker Compose version 2.30.1

## Deployment

1. Clone the repository to your server.

```bash
git clone git@github.com:EpitechPromo2027/B-DEV-500-STG-5-1-area-mohamed.mazouz.git
git pull origin main
```

2. Fill in the environment variables in the `.env` file at the root of the project.

3. Run the following command to start the project.

```bash
docker-compose up
```

You project is now running on your server!

PORTS are a bit different from the development environment:

- **Front-end**: [http://localhost:8080](http://localhost:8080)
- **Back-end**: [http://localhost:8081](http://localhost:8081)
- **Mobile**: an APK file will be generated and accessible at [http://localhost:8081/client.apk](http://localhost:8081/client.apk)
