FROM node:slim AS installer

RUN mkdir /app
WORKDIR /app

COPY package.json /app/

RUN npm install

FROM node:slim

RUN npm install pm2 -g

#RUN apt update
#RUN apt install cadvisor

#RUN apk update && apk add --no-cache curl
# Faça o download e instale o cAdvisor
#RUN curl -L https://github.com/google/cadvisor/releases/download/v0.37.0/cadvisor -o /usr/bin/cadvisor && \
#    chmod +x /usr/bin/cadvisor

RUN mkdir /app
WORKDIR /app

COPY leak.js /app
COPY fixLeak.js /app

#COPY counter.js /app
COPY ./metrics /app/metrics
#COPY gauge.js /app
#COPY histogram.js /app
#COPY summary.js /app

COPY --from=installer /app/package.json .
COPY --from=installer /app/node_modules ./node_modules

EXPOSE 8081

#Cenario 1 - Uso maior da area new da Heap (objetos young) e diminuicao do GC Scavenge (coleta de young)
#CMD ["pm2", "start", "leak.js", "--no-daemon", "--node-args='--max_semi_space_size=128'"]
#Cenario 2 - Uso majoritariamente da area Old da Heap e intenso do GC Scavenge (coleta de young)
CMD ["pm2", "start", "leak.js", "--no-daemon"]
