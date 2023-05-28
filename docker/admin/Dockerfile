FROM node:16.19-alpine as builder

WORKDIR /app

COPY ./admin /app

RUN npm install

RUN npm run build

FROM node:16.19-alpine

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 3000

ENTRYPOINT ["npm", "run", "start"]