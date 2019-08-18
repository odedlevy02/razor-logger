FROM node:11-alpine

WORKDIR /var/src

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node","index.js"]