---
sidebar_position: 2
---

# Service by ID | Get

The Get Service by ID endpoint provides a straightforward method for clients to access detailed information about a specific service. By using the unique service identifier, users can retrieve pertinent details such as the name, description, and status of the service. This capability is essential for applications that require service management or display functionalities, ensuring that users can interact with accurate and up-to-date service information.

## Endpoint
- **Endpoint**: `GET /services/{id}`
- **Description**: Retrieves a service by its ID.

## Parameters
- `id` (path) - The ID of the service to retrieve.

## Responses
- `200`: Returns the requested service details.
- `404`: Service not found.

## Example Request
Here’s an example of how to retrieve a service by its ID:
```json
GET /services/12345
Authorization: Bearer your-access-token

{
  "id": "12345",
  "name": "Example Service",
  "description": "This is a description of the example service.",
  "status": "active"
}
```
![Schema endpoint](/img/endpoint/service.png)

## Conclusion

The Get Service by ID endpoint allows clients to fetch details of a specific service using its unique identifier. This functionality is crucial for applications that need to display or manage service information effectively. If the service ID does not exist, a 404 response will be returned, ensuring robust error handling.