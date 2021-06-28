FROM node:latest

WORKDIR /smartcodehubapi

EXPOSE 3666

COPY . .
RUN npm i


CMD ["node","app.js"]

