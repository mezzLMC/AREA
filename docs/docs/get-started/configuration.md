---
sidebar_position: 1
---

# Configuration

## platform

The stable version of the app have been running on nodeJS v23.1.0 (npm 10.9.0).\

We chose to use yarn (v1.22.22) as default package manager for the whole project.

## Environment

Environment variable are split in 2 parts:
- **nextJS environment** that is the only way of passing variable to front-end for client-side components
- **dotenv environment** that will hold all of the sensitive informations such as API Keys, Oauth client IDS, database credentials.

### NextJS environment

Three env files should be added to the /web project directory:

- **.env.production**: That will be used when building the static pages or when NODE_ENV is set to "production"
- **.env.devlopment**: That will be used when running nextJS on dev mode with hot reload and dynamic compilation or when NODE_ENV is set to "devlopment"
- **.env.test**: That will be used when running nextJS when running unit and integration tests with NODE_ENV as "test"

The following environment variables in order to run nextJS correctly in each env files:
| Key                     | Description                                                                  |
|-------------------------|------------------------------------------------------------------------------|
| `NEXT_PUBLIC_API_URL`   | Base URL from where the front-end can make api calls                         |

Those 3 files are already available with default values that work great with the current development and deployment configuration but can be changed if you move the back-end codebase to another port or framework.

### dotenv environment

a single **.env** file should be at the root of the project containing the following variables:

| Key                     | Description                                                                  |
|-------------------------|------------------------------------------------------------------------------|
| `POSTGRES_DB`           | The name of the main PostgreSQL database.                                    |
| `POSTGRES_TEST_DB`      | The name of the PostgreSQL test database.                                    |
| `POSTGRES_USER`         | The username for connecting to the PostgreSQL database.                      |
| `POSTGRES_PASSWORD`     | The password for connecting to the PostgreSQL database.                      |
| `POSTGRES_HOST`         | The hostname or IP address of the PostgreSQL server.                         |
| `REDIS_HOST`            | The hostname or IP address of the Redis server.                              |
| `SPOTIFY_CLIENT_ID`     | The client ID for connecting to the Spotify API.                             |
| `SPOTIFY_CLIENT_SECRET` | The client secret for authenticating with the Spotify API.                   |
| `GOOGLE_CLIENT_ID`      | The client ID for Google OAuth integration.                                  |
| `GOOGLE_CLIENT_SECRET`  | The client secret for Google OAuth integration.                              |
| `DISCORD_CLIENT_ID`     | The client ID for Discord OAuth integration.                                 |
| `DISCORD_CLIENT_SECRET` | The client secret for Discord OAuth integration.                             |
| `TWITCH_CLIENT_ID`      | The client ID for Twitch OAuth integration.                                  |
| `TWITCH_CLIENT_SECRET`  | The client secret for Twitch OAuth integration.                              |
| `GITHUB_CLIENT_ID`      | The client ID for GitHub OAuth integration.                                  |
| `GITHUB_CLIENT_SECRET`  | The client secret for GitHub OAuth integration.                              |
| `MICROSOFT_CLIENT_ID`   | The client ID for Microsoft OAuth integration.                               |
| `MICROSOFT_CLIENT_SECRET`| The client secret for Microsoft OAuth integration.                          |
| `NGROK_AUTHTOKEN`       | The authentication token for ngrok service, used to create secure tunnels.   |

