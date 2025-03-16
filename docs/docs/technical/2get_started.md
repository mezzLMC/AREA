---
sidebar_position: 2
---

# Get started

This project is built using Docker to facilitate an efficient and consistent development environment. The project structure separates the back-end, web, and mobile servers, each contained within its own directory.

## Project Structure

The project contains the following directories:

- **/web/api/**: Contains the back-end server code. See the [API Overview](/docs/category/area-api-reference) for more information.
- **/web/pages/**: Contains the front-end server code.
- **/mobile/**: Contains the mobile application code.
- **/worker/**: Contains the worker service code, responsible for handling background tasks and processing.
- **/shared/**: Contains shared code that is used across different parts of the project.

Each directory has its own `Dockerfile`, and there is a central `docker-compose.yml` file located at the root of the project.

## Docker Compose

The `docker-compose.yml` file orchestrates the building and launching of the entire project. It does the following:

- Calls the `Dockerfile` in each respective directory (`/server/`, `/front/`, and `/mobile/`).
- Builds the entire project, ensuring all services are set up correctly.
- Starts the servers and binds PostrgreSQL, allowing the database to be utilized by the application.

## Server Configuration

After running the Docker containers, the servers can be accessed at the following addresses:

- **Front-end server**: [http://localhost:8080](http://localhost:8081)
- **Back-end server**: [http://localhost:8080](http://localhost:8080)
- **Mobile APK download**: [http://localhost:8080/client.apk](http://localhost:8080/client.apk)

## Conclusion

Using Docker for this project streamlines the development process and ensures that all components of the application can run seamlessly across different environments. The structure allows for easy management and scalability as the project evolves.
