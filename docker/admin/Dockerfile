FROM node:16.19-alpine

WORKDIR /app

COPY ../../admin /app

RUN npm install

RUN npm run build

EXPOSE 3000

ENTRYPOINT ["npm", "run", "start"]