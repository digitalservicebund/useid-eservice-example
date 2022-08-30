FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8443

CMD [ "npm", "run", "build-sdk-and-start" ]
