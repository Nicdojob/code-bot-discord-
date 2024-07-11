FROM node:alpine

# WORKDIR /app
WORKDIR /usr/src/app

COPY package*.json . /

RUN npm install

COPY . .

CMD ["node", "./src/index.js"]
