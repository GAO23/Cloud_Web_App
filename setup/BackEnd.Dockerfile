FROM node:12-slim
MAINTAINER Xiangshuai Gao gaoxiangshuai@gmail.com
EXPOSE 3001

WORKDIR /app
COPY . /app

WORKDIR "/app/cloud_drive_backend"
RUN npm install
CMD ["node", "./bin/www", "&"]

#CMD ["/bin/bash"]
