---
sidebar_position: 2
---

# User by ID | Get

The Get User by ID endpoint is a vital component of user management in applications that require specific user information. This endpoint allows clients to retrieve detailed information about a user by providing their unique identifier. It is particularly useful for administrative tasks, profile management, and displaying user-specific data within applications. By ensuring that the correct user details are fetched, it enhances the overall user experience and data integrity. If the specified user ID is not found, appropriate error responses ensure that clients are informed of any issues, maintaining robust error handling.

## Endpoint
- **Endpoint**: `GET /users/{id}`
- **Description**: Retrieves a user by their ID.

## Parameters
- `id` (path) - The ID of the user to retrieve.

## Responses
- `200`: Returns the user details.
- `401`: Unauthorized.
- `404`: User not found.

## Example Request
Here’s an example of how to retrieve a user by their ID:
```json
GET /users/12345
Authorization: Bearer your-access-token

{
  "id": "12345",
  "username": "exampleUser",
  "email": "user-email@example.com"
}
```

![Schema endpoint](/img/endpoint/users.png)

## Conclusion

The Get User by ID endpoint allows clients to fetch details of a specific user using their unique identifier. This is essential for applications that need to display or manage user information effectively. If the user ID does not exist, a 404 response will be returned, ensuring proper error handling.