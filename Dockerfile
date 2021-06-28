FROM node:latest

WORKDIR /smartcodehubapi

EXPOSE 3666

COPY ./package.json .
RUN npm i
COPY . .


CMD ["node","app.js"]

