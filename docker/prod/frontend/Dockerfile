FROM node:16.19-alpine

WORKDIR /app

COPY ./frontend /app

RUN npm install

RUN npm run build

EXPOSE 3000