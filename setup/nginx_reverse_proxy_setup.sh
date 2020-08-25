#!/bin/bash

if [ "$EUID" -ne 0 ]
  then echo "Please run as root"
  exit
fi

apt update;
apt install nginx;
systemctl enable nginx;
rm -rf /etc/nginx/sites-enabled/default;
cp nginx_reverse_proxy.conf  /etc/nginx/sites-available/;
ln /etc/nginx/sites-available/nginx_reverse_proxy.conf  /etc/nginx/sites-enabled/default;
nginx -s reload;
