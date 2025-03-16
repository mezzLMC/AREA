---
sidebar_position: 1
---

# Prerequists

## Ngrok

Ngrok is a tool that allows you to expose a web server running on your local machine to the internet.\
We use it to forward webhooks from some services that requires a public HTTPS URL to work.

Grab your auth token from [here](https://dashboard.ngrok.com/get-started/setup) and keep it handy.

### Linux installation


We can install Ngrok using [snap package manager](https://snapcraft.io/docs/installing-snapd).

```bash
sudo snap install ngrok\
ngrok config add-authtoken [YOUR_NGROK_KEY] # replace [YOUR_NGROK_KEY] by your actual nrok auth token
ngrok ngrok http http://localhost:8080  # with 8080 being the port your web is running on
```

### Linux installation

```bash
docker run -it --network host -p 4040:4040 -e NGROK_AUTHTOKEN=[YOUR_NGROK_KEY] ngrok/ngrok:latest http http://localhost:8080 # replace [YOUR_NGROK_KEY] by your actual nrok auth token
```

## Redis

Redis is an open-source in-memory data structure store that can be used as a database, cache, and message broker.\
We use it to store the session data of the users and set up a queue for background jobs and reactions to be processed.

**Linux installation**

We can install Redis using [snap package manager](https://snapcraft.io/docs/installing-snapd).

```bash
sudo snap install redis
sudo systemctl start snap.redis.server # start the redis server for a single time
sudo systemctl enable --now snap.redis.server # start the redis server on boot
```

### Docker installation

```bash
docker run -d --name redis -p 6379:6379 redis:latest
```
