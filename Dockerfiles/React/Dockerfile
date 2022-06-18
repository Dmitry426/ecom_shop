FROM node:16.15.1


WORKDIR /usr/src/app

COPY package*.json ./
RUN npm cache verify
RUN npm install || true

COPY  . .

EXPOSE 3000
