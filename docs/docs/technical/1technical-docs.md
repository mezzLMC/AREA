---
sidebar_position: 1
---

# Project Overview

This is the technical documentation for the AREA project, which will detail all the technical aspects and code of the application. If you want to know how to use the application, please refer to the provided user’s guide.

The AREA project is designed to create a software suite that functions similarly to IFTTT and/or Zapier. This suite is divided into three main parts:

- **Worker**: Implements all the core features such as external services API's polling, action validation and reaction triggers.
- **Server**: Responsible of data manipulation and communication between the worker and the web/mobile applications and webhooks reception.
- **Web Application**: A browser-based responsive interface for users to interact with the system.
- **Mobile Application**: A mobile-friendly version of the app, accessible on IOS and Android platforms.

## Project main technologies

the entire codebase has been written in Typescript to enable simple, type-safe data transfer from the server to mobile and web clients, and the reuse of some modules between platforms.

This project utilizes the following technologies:

- **Server**: Next.js
- **Web Application**: Next.js
- **Mobile Application**: React-Native
- **Database**: PostgreSQL


## Technologies rationale 

- **Next.js**: Next.js is a React framework that provides server-side rendering and static site generation capabilities for front-end and easy API handling for back-end. It is a versatile tool that allows for fast development and deployment of web applications with a focus on performance and SEO.

- **PostgreSQL**: PostgreSQL is chosen as relationnal database for its robustness and support for complex queries, ensuring data integrity and reliability.

- **React Native**: React Native is a popular framework for building mobile applications using JavaScript and React. It allows for cross-platform development, enabling the creation of apps that work on both iOS and Android devices with a single codebase.


## Libraries and Dependencies

The AREA project incorporates various libraries and dependencies to enhance its functionality. Some of the key libraries used include:

- **Tailwind CSS**: An utility-first CSS framework that provides a set of pre-built classes for styling web applications. It allows developers to create custom designs quickly and efficiently by combining utility classes to style elements.

- **Redis**: Utilized for caching and managing session data, Redis helps improve application performance by reducing database load and speeding up data retrieval processes.

- **Drizzle**: An ORM (Object-Relational Mapping) library that simplifies database operations by providing a higher-level abstraction over SQL queries. It helps manage database connections, execute queries, and handle data mapping between the application and the database.

- **Ngrok**: A tool that creates secure tunnels to expose local servers to the internet. It enables developers to test webhooks and other external integrations in a local development environment without deploying the application to a live server.

## Conclusion

The AREA project leverages modern technologies to create a comprehensive automation platform. With a focus on performance and user experience, the architecture supports both web and mobile interfaces, ensuring that users can manage their automations seamlessly across devices.

## References and external documentations
- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [React Native](https://reactnative.dev/)
- [Postgres](https://www.postgresql.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Redis](https://redis.io/)
- [Drizzle](https://orm.drizzle.team/)
- [Ngrok](https://ngrok.com/)
