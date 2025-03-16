---
sidebar_position: 3
---

# Google Auth | Post

This section outlines the Google Auth endpoint, which facilitates user authentication through Google accounts. By providing the necessary OAuth code, users can seamlessly connect their Google profiles to your application, enabling easy access and enhanced user experience.

## Endpoint
- **Endpoint**: `POST /auth/google`
- **Description**: Retrieves user information from Google.

## Request Body
- `code` (string) - Google OAuth code.

## Responses
- `200`: User is connected with Google, returns a session token.
- `201`: User is created and connected with Google.
- `400`: Bad request.

## Example Request
Here’s an example of how to get user info from Google:

```json
POST /auth/google
Content-Type: application/json

{
  "code": "your-google-oauth-code"
}

{
  "token": "your-session-token-here",
  "user": {
    "id": "user-id",
    "username": "user-name",
    "email": "user-email@example.com"
  }
}
```
![Schema endpoint](/img/endpoint/auth.png)

## Conclusion
The Google Auth endpoint allows users to authenticate via their Google account by providing the OAuth code received during the login process. If successful, the user is either connected or created in the system, and a session token is returned for authenticated access. In case of a bad request, a 400 error response is provided, ensuring proper error handling during the authentication process.
