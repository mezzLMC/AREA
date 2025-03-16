FROM node:21.2.0

WORKDIR /app

COPY /package.json package.json
COPY shared shared

COPY worker worker

RUN yarn install

WORKDIR /app/worker
 
CMD ["yarn", "start" ]
 