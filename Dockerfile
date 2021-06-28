# syntax=docker/dockerfile:1.0.0-experimental


FROM node:12-alpine 


ARG SSH_KEY
RUN apk add git openssh-client
WORKDIR /smartcodehubapi


COPY . .
RUN ls
RUN npm i

EXPOSE 3666
CMD ["node","app.js"]

