---
sidebar_position: 1
---

# Register | Post

This section outlines the Register endpoint, which enables new users to create an account in the system. By providing essential information such as a username, password, and email address, users can register and gain access to the platform. This process is the first step towards personalized experiences and secure access to services.

## Endpoint
- **Endpoint**: `POST /auth/register`
- **Description**: Creates a new user.

## Request Body
- `username` (string) - The desired username.
- `password` (string) - The password for the new account.
- `email` (string) - The email address of the user.

## Responses
- `200`: Returns the created user ID and username.
- `400`: Bad request.
- `500`: Internal server error.

## Example Request
Here’s an example of a registration request:
```json
POST /auth/register
Content-Type: application/json

{
  "username": "new-user",
  "password": "your-password",
  "email": "new-user@example.com"
}

{
  "id": "new-user-id",
  "username": "new-user"
}
```
![Schema endpoint](/img/endpoint/auth.png)

## Conclusion

This endpoint allows for the creation of new user accounts, enabling users to register by providing their username, password, and email address. A successful registration will return the user's ID and username, facilitating future authentication and personalized user experiences.