#!/bin/bash
# cd smart-code-hub/smart-code-hub-api/
# ls
# docker load -i ./dist/smartcodehubapi-prod.tar.gz
# docker images
# docker stop smartcodehubapi-prod || true && docker rm smartcodehubapi-prod || true
# docker container ls




key=$(cat ~/.ssh/id_rsa | base64)
export SSH_KEY=$(cat ~/.ssh/id_rsa | base64)

cd /Smartcodehub/Smartcodehub-api
ls
echo $SSH_KEY
docker build --build-arg SSH_KEY -t smartcodehubapi-prod .

npm run start:container 
docker container ls
exit 0
