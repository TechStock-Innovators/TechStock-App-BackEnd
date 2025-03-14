FROM node:23-alpine3.20 AS techstockapi

WORKDIR /home/node/app

COPY . .

RUN npm install

CMD npm run dev