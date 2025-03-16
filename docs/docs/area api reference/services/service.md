---
sidebar_position: 1
---

# All Services | Get

The All Services endpoint provides clients with the capability to retrieve a complete list of services registered in the system. This functionality is vital for applications that require an overview of all available services, enabling users to efficiently access and manage service-related information. By aggregating service details in a single response, this endpoint simplifies data retrieval and enhances the user experience when working with multiple services.


## Endpoint
- **Endpoint**: `GET /services`
- **Description**: Retrieves all services.

## Responses
- `200`: Returns a list of all services.

## Example Request
Here’s an example of how to retrieve all services:
```json
GET /services
Authorization: Bearer your-access-token

[
  {
    "id": "12345",
    "name": "Example Service",
    "description": "This is a description of the example service.",
    "status": "active"
  },
  {
    "id": "67890",
    "name": "Another Service",
    "description": "This is a description of another service.",
    "status": "inactive"
  }
]
```

![Schema endpoint](/img/endpoint/service.png)

## Conclusion

The Get All Services endpoint allows clients to retrieve a comprehensive list of services available in the system. This functionality is essential for applications that need to display or manage multiple services efficiently. The response provides relevant details for each service, allowing for effective data handling and presentation.