---
sidebar_position: 6
---

# Database Structure

This project utilizes PostgreSQL as the database management system. It is integrated with NodeJS and Express to facilitate interactions between the front-end server and the API server.

## Models Overview

The database contains several key models, including **User**, **AREA**, and **ConnectSession**. Each of these models is designed to store relevant data for the application.

### User Model

The **User** model schema contains the following fields:

- **email**: User's email address (type: `VARCHAR`)
- **password**: Encrypted password for the user (type: `VARCHAR`)
- **display_name**: Username of the user (type: `VARCHAR`)
- **is_google_authed**: Indicates if the user is authenticated via Google (type: `BOOLEAN`)
- **connect_data**: Data retrieved when the user connects to a service (type: `JSON`)

### AREA Model

The **AREA** model is responsible for storing information about user actions and reactions. It includes the following fields:

- **user_id**: Unique identifier for the user (type: `UUID`)
- **action**: Details about the action performed (type: `JSON`)
- **reaction**: Details about the reaction to the action (type: `JSON`)

#### Action Schema

The **Action** schema defines the structure of an action:

- **service**: Name of the service related to the action (type: `VARCHAR`)
- **name**: Name of the action (type: `VARCHAR`)
- **data field**: Additional information about the action (type: `JSON`)

#### Reaction Schema

The **Reaction** schema defines the structure of a reaction:

- **service**: Name of the service related to the reaction (type: `VARCHAR`)
- **name**: Name of the reaction (type: `VARCHAR`)
- **data field**: Additional information about the reaction (type: `JSON`)

### ConnectSession Model

The **ConnectSession** model is used to manage data when the user attempts to connect to a service. It includes:

- **user_id**: Unique identifier for the user (type: `UUID`)
- **endpoint**: The endpoint the user is accessing (type: `VARCHAR`)
- **data**: Data passed through endpoints and callbacks (type: `JSON`)
