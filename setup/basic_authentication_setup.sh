#!/bin/bash

if [ "$EUID" -ne 0 ]
  then echo "Please run as root"
  exit
fi

apt update;
apt install nginx -y;
apt install apache2-utils -y; 
systemctl enable nginx;
htpasswd -c /etc/nginx/.htpassw xgao # replace the xgao with your username
rm -rf /etc/nginx/sites-enabled/default;
cp basic_authentication_setup.conf  /etc/nginx/sites-available/;
ln /etc/nginx/sites-available/basic_authentication_setup.conf  /etc/nginx/sites-enabled/default;
nginx -s reload;
