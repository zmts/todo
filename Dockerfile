FROM node:18.16.0-alpine3.17

RUN apk update && apk upgrade

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD  npm run typeorm:run ; npm run start:prod
