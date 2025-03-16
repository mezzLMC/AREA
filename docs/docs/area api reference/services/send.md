---
sidebar_position: 3
---

# Execute Service | Post

The Execute Service endpoint allows clients to create new services within the system easily. This functionality is crucial for applications that require dynamic service management, enabling users to define and register services by specifying essential details such as name, description, and status. By streamlining the service creation process, this endpoint enhances the overall efficiency of service management in your application.


## Endpoint
- **Endpoint**: `POST /services`
- **Description**: Creates a new service.

## Request Body
- `name` (string) - The name of the service.
- `description` (string) - A brief description of the service.
- `status` (string) - The status of the service (e.g., active, inactive).

## Responses
- `201`: Returns the created service with its ID.
- `400`: Bad request.
- `500`: Internal server error.

## Example Request
Here’s an example of how to create a new service:
```json
POST /services
Content-Type: application/json
Authorization: Bearer your-access-token

{
  "name": "New Service",
  "description": "This is a description of the new service.",
  "status": "active"
}

{
  "id": "new-service-id",
  "name": "New Service",
  "description": "This is a description of the new service.",
  "status": "active"
}
```

![Schema endpoint](/img/endpoint/service.png)

## Conclusion

The Send Service endpoint enables clients to create new services within the system. By providing the necessary details such as name, description, and status, users can efficiently manage service creation. A successful request will return the details of the newly created service, including its unique ID, facilitating further operations on that service.