---
sidebar_position: 1
---

# All Users | Get

The Get All Users endpoint is a crucial feature for applications that require access to user data across the system. By enabling the retrieval of all registered users, this endpoint facilitates user management, administrative tasks, and analytics. It is particularly beneficial for applications that need to display user information in dashboards, manage user roles, or conduct bulk operations. The response includes essential user details, such as ID, username, and email, allowing developers to implement comprehensive user-related functionalities efficiently.

## Endpoint
- **Endpoint**: `GET /users`
- **Description**: Retrieves all users.

## Responses
- `200`: Returns a list of all users.

## Example Request
Here’s an example of how to retrieve all users:
```json
GET /users
Authorization: Bearer your-access-token

[
  {
    "id": "12345",
    "username": "exampleUser",
    "email": "user-email@example.com"
  },
  {
    "id": "67890",
    "username": "anotherUser",
    "email": "another-user@example.com"
  }
]
```

![Schema endpoint](/img/endpoint/users.png)

## Conclusion

The Get All Users endpoint allows clients to retrieve a comprehensive list of users registered in the system. This functionality is essential for applications that need to manage or display multiple users efficiently. The response provides relevant details for each user, facilitating effective data handling and presentation.