FROM node:16.19-alpine

WORKDIR /app

COPY ../../parsers/ /app

RUN npm run build

EXPOSE 3333

RUN npm install
