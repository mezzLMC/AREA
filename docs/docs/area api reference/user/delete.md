---
sidebar_position: 5
---

# Delete User | Delete

The user deletion functionality is essential for managing accounts within the system. This endpoint allows authorized clients to remove a specific user by providing their unique identifier. Deleting a user may be necessary for various reasons, such as deactivating an inactive account or at a user’s request to have their data removed. The process ensures that the user is effectively removed from the system and provides appropriate error responses in case of issues, such as unauthorized access or a non-existent user ID.

## Endpoint
- **Endpoint**: `DELETE /users/{id}`
- **Description**: Deletes a user by their ID.

## Parameters
- `id` (path) - The ID of the user to delete.

## Responses
- `200`: Returns a message indicating the user has been successfully deleted.
- `401`: Unauthorized, if the user is not authorized to delete this user.
- `404`: User not found, if no user matches the provided ID.

## Example Request
Here’s an example of how to delete a user by their ID:
```json
DELETE /users/12345
Authorization: Bearer your-access-token

{
  "message": "User deleted successfully."
}
```

![Schema endpoint](/img/endpoint/users.png)

## Conclusion

The Delete User endpoint allows authorized clients to remove a user from the system by specifying their unique ID. This functionality is important for maintaining user account management and ensuring that users can be deleted when necessary. Upon successful deletion, a confirmation message is returned. Appropriate error responses are provided for unauthorized access or non-existent users.