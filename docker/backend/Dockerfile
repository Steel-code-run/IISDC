FROM node:16.19-alpine

WORKDIR /app

COPY ../../backend/ /app

RUN npm install

RUN npm run prisma:generate

RUN npm run build
