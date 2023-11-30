FROM node:alpine

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY ./index-async-express-mysql.js .
COPY ./index-sync-express-mysql.js .
COPY ./index-async-express-procedure-wait.js .
COPY ./metrics/* ./metrics/


RUN npm install pm2 -g

ENV DOCKERIZE_VERSION v0.7.0

RUN apk update --no-cache \
    && apk add --no-cache wget openssl \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
    && apk del wget
EXPOSE 3000

ENV UV_THREADPOOL_SIZE=30

## TESTES COM APP ASSÍNCRONA 

#app assíncrono / heap(64) / semi_space(0)
CMD ["dockerize", "-wait", "tcp://mysql-container:3306", "-timeout", "60s", "node", "--trace-gc", "--max_semi_space_size=0", "index-async-express-mysql.js", "2>&1"]

#app assíncrono / procedure wait / heap(64) / semi_space(0)
#CMD ["dockerize", "-wait", "tcp://mysql-container:3306", "-timeout", "60s", "node", "--trace-gc", "--max_semi_space_size=0", "index-async-express-procedure.js", "2>&1"]

#app assíncrono / heap(88) / semi_space(24)
#CMD ["dockerize", "-wait", "tcp://mysql-container:3306", "-timeout", "60s", "node", "--trace-gc", "--max_semi_space_size=24", "index-async-express-mysql.js", "2>&1"]

#app assíncrono / semi_space(24)
#CMD ["dockerize", "-wait", "tcp://mysql-container:3306", "-timeout", "60s", "node", "--trace-gc", "--max_semi_space_size=48", "index-async-express-mysql.js", "2>&1"]

#app assíncrono / semi_space(24)
#CMD ["dockerize", "-wait", "tcp://mysql-container:3306", "-timeout", "60s", "node", "--trace-gc", "--max_semi_space_size=64", "index-async-express-mysql.js", "2>&1"]

## TESTES COM APP SÍNCRONA 

## TODO: Implementar um wait na api rest (alem da consulta ao banco) para forçar a latencia subir e analisar 
##       Avaliar como será o comportamento do pool de conexoes do S.O com netstat x a contenção na thread
##       principal do node. 

#app síncrono / heap(64) / semi_space(0)
#CMD ["dockerize", "-wait", "tcp://mysql-container:3306", "-timeout", "60s", "node", "--trace-gc", "--max_semi_space_size=0", "index-sync-express-mysql.js", "2>&1"]

## TODO: Implementar endpoint Prometheus na app para coleta de metricas de GC, latencia e throughput

#app síncrono / semi_space(0)
#CMD ["dockerize", "-wait", "tcp://mysql-container:3306", "-timeout", "60s", "node", "--trace-gc", "--max_semi_space_size=24", "index-sync-express-mysql.js", "2>&1"]