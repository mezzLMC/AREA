/*
** EPITECH PROJECT, 2024
** area
** File description:
** swagger
*/

import { createSwaggerSpec } from "next-swagger-doc";
import { users } from "@shared/models";

export default async () => {
  const spec = createSwaggerSpec({
    apiFolder: "app/api",
    schemaFolders: ["lib"],
    
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Next Swagger API Example",
        version: "1.0",
      },
      servers: [
        {
          url: "http://localhost:8080/api",
        },
        {
          url: "http://localhost:8080/api"
        }
      ],
      security: [
        {
          BearerAuth: [],
        },
      ],
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer"
          }
        },
        responses: {
          InternalServerError: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          Unauthorized: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                    },
                  },
                },
                example: {
                  message: "Unauthorized",
                },
                }
              },
          },
          NotFound: {
            description: "Resource not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/NotFound",
                },
              },
            },
          }
        },
        schemas: {
          ServiceInfo: {
            type: "object",
            properties: {
              id: {
                type: "string",
              },
              name: {
                type: "string",
              },
              description: {
                type: "string",
              },
              imageURL: {
                type: "string",
              },
              actionCount: {
                type: "number",
              },
              reactionCount: {
                type: "number",
              },
              "oauthId?": {
                type: "string",
              },
            }
          },
          AReaInfo: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                },
                name: {
                  type: "string",
                },
                description: {
                  type: "string",
                },
                fields: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                      },
                      type: {
                        type: "string",
                      },
                      "values?": {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      }
                    },
                  },
                },
              },
            },
          },
          DetailedService: {
            type: "object",
            properties: {
              id: {
                type: "string",
              },
              name: {
                type: "string",
              },
              description: {
                type: "string",
              },
              imageURL: {
                type: "string",
              },
              actions: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/AReaInfo",
                },
              reactions: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/AReaInfo",
                },
              }
              },
            },
          },
          NotFound: {
            type: "object",
            properties: {
              message: {
                type: "string",
              },
            },
          },
          UserSession: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                description: "user id of the user attached to the session",
              },
              token: {
                type: "string",
              },
            },
            example: {
              id: 1,
              token: "your-uuid-token-here",
            }
          },
          Error: {
            type: "object",
            properties: {
              error: {
                type: "string",
              },
            },
          },
          User: {
            type: "object",
            properties: Object.keys(users).reduce((acc, key) => {
              acc[key] = { type: "string" };
              return acc;
            }, {} as Record<string, { type: string }>),
          },
        },
      },
    },
  });
  return spec;
};
