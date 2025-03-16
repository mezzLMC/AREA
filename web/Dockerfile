FROM node:21.2.0

WORKDIR /app

COPY package.json /app/package.json


COPY shared /app/shared
COPY web /app/web

RUN yarn install

EXPOSE 8080

WORKDIR /app/web

CMD [ "yarn", "dev-docker" ]
