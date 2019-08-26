FROM node:11-alpine

WORKDIR /var/src

COPY package*.json ./

RUN npm install

#install from npm and not from link
RUN npm install razor-logger

COPY . .

CMD ["node","index.js"]