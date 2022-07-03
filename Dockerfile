FROM nginx:latest
RUN apt-get update
RUN apt-get --assume-yes install vim
RUN apt-get --assume-yes install nginx-module-njs
COPY default.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY src/njs.js /etc/nginx/njs/njs.js
COPY index.html /usr/share/nginx/html/index.html
COPY block.html /usr/share/nginx/html/block.html
COPY login.html /usr/share/nginx/html/login.html
