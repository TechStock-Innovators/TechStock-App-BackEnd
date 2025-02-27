FROM node:23-alpine3.20 AS TechStockAPI

WORKDIR /home/node/app

COPY . .

RUN npm install

CMD npm run dev