---
sidebar_position: 2
---

# Running the app

Go the root of the project and run the following command to install all the dependencies of the project:

```bash
yarn
```

This will install all the dependencies of the project in the `web`, `mobile`, and `shared` and `worker` directories.

# Web development

Go to the web folder and run the following command to start the web app in development mode:

```bash
yarn dev
```
This will start the nextJS development server and open the web app in your browser.

# Worker development

:::caution
The web app and ngrok must be running in order to start the worker. 
:::

Go to the worker folder and run the following command to start the worker in development mode:

```bash
yarn dev
```

This will start a nodemon server that will watch for changes in the worker code and restart the worker automatically.


# Mobile development

:::caution
The web app must be running in order to start the use the mobile app.
:::

Go to the mobile folder and run the following command to start the mobile app in development mode:

```bash
yarn start
```

This will start the expo development server and open the expo client on your phone or emulator.



