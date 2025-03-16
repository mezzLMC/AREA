---
sidebar_position: 4
---

# Project Structure

The AREA project is organized into three main directories, each containing the code for its corresponding part:

- **Web**: This directory holds the code for both front-end and back-end components.

- **Mobile**: This directory contains the code for the mobile application, developed with **React Native** and **TypeScript**. It enables users to interact with the AREA platform on their mobile devices.

- **Shared**: This directory contains shared code that is used across different parts of the project.
    - common types, utilities, and constants that are shared between the different project components as well.
    -  an API.ts file that contains a type-safe interface for the API to be used by the front-end and and the mobile application.
    - an "oauth" folder that will contain the code for each Oauth service that the project will support.
    - a "service" folder that will contain the code for each service, it's actions and reactions.
    - models for the different entities used to generate the database schemas and interact with them using Drizzle.
