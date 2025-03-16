---
sidebar_position: 4
---

# Update User | Put

The Update User endpoint plays a crucial role in user account management, enabling clients to modify existing user information, such as the username and email address. This endpoint is essential for applications that prioritize user personalization and data accuracy, allowing users to keep their profiles up to date. By facilitating user updates, the endpoint enhances user experience and ensures that information remains relevant and correct. In cases where the user ID is invalid or the client lacks the necessary authorization, appropriate error responses are provided, promoting robust error handling and security.

## Endpoint
- **Endpoint**: `PUT /users/{id}`
- **Description**: Updates a user by their ID.

## Parameters
- `id` (path) - The ID of the user to update.

## Request Body
- `username` (string) - The new username for the user.
- `email` (string) - The new email address for the user.

## Responses
- `200`: Returns the updated user details.
- `400`: Validation error, if the input data is invalid.
- `401`: Unauthorized, if the user is not authorized to update this user.
- `404`: User not found, if no user matches the provided ID.

## Example Request
Here’s an example of how to update a user by their ID:
```json
PUT /users/12345
Content-Type: application/json
Authorization: Bearer your-access-token

{
  "username": "updatedUser",
  "email": "updated-user@example.com"
}

{
  "id": "12345",
  "username": "updatedUser",
  "email": "updated-user@example.com"
}
```

![Schema endpoint](/img/endpoint/users.png)

## Conclusion

The Update User endpoint allows authorized clients to modify user details such as username and email. This functionality is essential for maintaining accurate user profiles and ensuring that users can manage their own information. Upon a successful update, the response includes the modified user details, while appropriate error responses are provided for invalid input, unauthorized access, or non-existent users.