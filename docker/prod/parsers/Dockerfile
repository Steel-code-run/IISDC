FROM node:16.19-alpine

WORKDIR /app

COPY ./parsers/ /app

RUN npm install

RUN npm run build

EXPOSE 3333

