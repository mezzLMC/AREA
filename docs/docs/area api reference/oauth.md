---
sidebar_position: 2
---

# OAuth

## Overview
This section describes the OAuth endpoints available in the API for handling user authentication through external providers.

### 1. **Handle OAuth Callback**
- **Endpoint**: `GET /auth/{id}`
- **Description**: Handles the OAuth callback and exchanges the authorization code for an access token.
- **Parameters**:
  - `id` (path) - The ID of the OAuth service (e.g., google, github, etc.)
  - `code` (query) - The authorization code returned from the OAuth provider.
  - `state` (query) - The state parameter to verify the OAuth request.
- **Responses**:
  - `302`: Redirects to the originally requested URL after successful authentication.
  - `400`: Bad request or missing/invalid parameters.
  - `404`: OAuth service not found.

### 2. **Initiate OAuth Login Flow**
- **Endpoint**: `POST /auth/generate/{id}`
- **Description**: Initiates the OAuth login flow.
- **Parameters**:
  - `id` (path) - The ID of the OAuth service (e.g., google, github, etc.)
- **Request Body**:
  - `redirectURL` (string) - The URL to redirect the user to after successful OAuth authentication.
- **Responses**:
  - `200`: Returns the OAuth redirect URL.
  - `401`: Unauthorized, missing or invalid token.
  - `404`: OAuth service not found.

### Example Request
Here’s an example of how to initiate the OAuth login flow for Google:
```json
POST /auth/generate/google
Content-Type: application/json

{
  "redirectURL": "http://yourapp.com/auth/callback"
}

{
  "redirectURL": "https://accounts.google.com/o/oauth2/auth?client_id=your-client-id&redirect_uri=http://yourapp.com/auth/callback&response_type=code"
}
```

![Oauth endpoint](/img/endpoint/oauth.png)


## Conclusion

The OAuth endpoints allow users to authenticate through external providers, enhancing security and user experience. Refer to the specific endpoint descriptions for detailed usage instructions.