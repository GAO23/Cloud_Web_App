FROM node:12-slim
MAINTAINER Xiangshuai Gao gaoxiangshuai@gmail.com
EXPOSE 3000

WORKDIR /app
COPY . /app

WORKDIR "/app/cloud_drive_front_end"
RUN npm install
CMD ["npm", "start", "&"]

#CMD ["/bin/bash"]
