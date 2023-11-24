FROM node:alpine

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY ./index-async-express-mysql.js .
COPY ./index-sync-express-mysql.js .

RUN npm install pm2 -g

ENV DOCKERIZE_VERSION v0.7.0

RUN apk update --no-cache \
    && apk add --no-cache wget openssl \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
    && apk del wget
EXPOSE 3000

CMD ["dockerize", "-wait", "tcp://mysql-container:3306", "-timeout", "60s", "pm2", "start", "index-async-express-mysql.js", "--no-daemon"]
