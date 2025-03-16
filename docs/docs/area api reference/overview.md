---
sidebar_position: 1
---

# API Overview

This is the API documentation for the Next Swagger API Example. The API is built using **OpenAPI 3.0.0** and offers various endpoints to manage authentication, services, and users.

### Server
- **Base URL**: `http://localhost:8080/api`

### Security
- **Authentication**: Bearer Token

## Schemas

### UserSession Schema
```json
{
  "id": 1,
  "token": "your-uuid-token-here"
}

{
  "id": "string",
  "username": "string",
  "email": "string",
  "authType": "string"
}

{
  "id": "string",
  "name": "string",
  "description": "string",
  "imageURL": "string"
}

{
  "error": "Internal Server Error"
}

{
  "message": "Resource not found"
}
```

![Schema endpoint](/img/endpoint/schem.png)

## Conclusion

This documentation provides an overview of the API schemas available in the Next Swagger API Example. For detailed information on each endpoint, please refer to the specifications provided in the respective sections.