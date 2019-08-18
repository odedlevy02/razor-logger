FROM node:11-alpine

WORKDIR /var/src

COPY package*.json ./

RUN npm install


COPY . .
#install from npm and not from link
RUN npm i razor-logger

CMD ["node","index.js"]