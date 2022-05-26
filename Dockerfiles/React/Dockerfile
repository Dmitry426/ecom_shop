FROM node:16.14.0


WORKDIR /usr/src/app

COPY package*.json ./
RUN npm cache verify
RUN npm install || true

COPY  . .

EXPOSE 3000
