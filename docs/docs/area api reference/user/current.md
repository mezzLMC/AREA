---
sidebar_position: 3
---

# Current User | Get

The Current User endpoint is essential for applications that require user-specific information to tailor the user experience. By retrieving the details of the user currently logged in, the system can provide personalized content, manage user settings, and facilitate user interactions. This endpoint ensures that only authenticated users can access their data, enhancing security and user privacy. The response includes vital user information, such as the user ID, username, and email, enabling seamless integration with the application's features.

## Endpoint
- **Endpoint**: `GET /users/me`
- **Description**: Retrieves the currently logged-in user.

## Responses
- `200`: Returns the details of the currently logged-in user.
- `401`: Unauthorized, if the user is not logged in.

## Example Request
Here’s an example of how to retrieve the currently logged-in user:
```json
GET /users/me
Authorization: Bearer your-access-token

{
  "id": "12345",
  "username": "currentUser",
  "email": "current-user@example.com"
}
```

![Schema endpoint](/img/endpoint/users.png)

## Conclusion

The Get Current User endpoint allows clients to fetch details of the user associated with the active session. This functionality is crucial for applications that need to provide personalized experiences or manage user-specific data. A successful response returns the user's ID, username, and email, while an unauthorized request results in a 401 response, ensuring secure access control.