FROM node:22.2.0 as dependencies
WORKDIR /src/
ADD . /src/
RUN echo "deb http://deb.debian.org/debian buster main" > /etc/apt/sources.list
RUN apt-get clean
RUN apt-get update
RUN apt-get -y install sudo


#RUN npm install 
RUN npm i bcrypt
RUN npm ci
EXPOSE 4000






