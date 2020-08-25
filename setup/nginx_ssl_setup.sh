#!/bin/bash

if [ "$EUID" -ne 0 ]
  then echo "Please run as root"
  exit
fi

apt update;
apt install nginx -y;
systemctl enable nginx;
mkdir /etc/nginx/ssl;
chmod 700 /etc/nginx/ssl;
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/certificate.key -out /etc/nginx/ssl/certificate.crt;
rm -rf /etc/nginx/sites-enabled/default;
cp ssl.config  /etc/nginx/sites-available/ ;
ln /etc/nginx/sites-available/ssl.conf  /etc/nginx/sites-enabled/default;
nginx -s reload;
