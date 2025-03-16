---
sidebar_position: 2
---

# Login | Post

This section describes the Login endpoint, which enables users to gain access to their accounts by entering their email and password. This authentication process is crucial for maintaining the security and privacy of user data, ensuring that only authorized individuals can log in.

## Endpoint
- **Endpoint**: `POST /auth/login`
- **Description**: Logs in a user.

## Request Body
- `email` (string) - The user's email.
- `password` (string) - The user's password.

## Responses
- `200`: Returns a new session.
- `404`: User not found.

## Example Request
Here’s an example of a login request:
```json
POST /auth/login
Content-Type: application/json

{
  "email": "user-email@example.com",
  "password": "your-password"
}
{
  "token": "your-session-token-here"
}
```
![Schema endpoint](/img/endpoint/auth.png)

## Conclusion
The login endpoint allows users to authenticate by providing their email and password. Upon successful login, a new session is created, and the user receives a session token that can be used for subsequent authenticated requests. If the user is not found, a 404 response is returned, ensuring secure access to user accounts.
