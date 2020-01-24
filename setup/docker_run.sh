#! /bin/bash

# script is untested, will need to sort out the issues

docker build -t xgao/react -f ./FrontEnd.Dockerfile ../ ;
docker build -t xgao/server -f ./BeackEnd.Dockerfile ../ ;
docker run -d -p 3001:3001 xgao/server ;
docker run -d -p 3000:3000 xgao/react ;

