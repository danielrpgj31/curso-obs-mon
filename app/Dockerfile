FROM node:13-alpine3.11 AS installer

RUN mkdir /app
WORKDIR /app

COPY package.json /app/

RUN npm install

FROM node:13-alpine3.11

RUN npm install pm2 -g

RUN apk update && apk add --no-cache curl
# Faça o download e instale o cAdvisor
RUN curl -L https://github.com/google/cadvisor/releases/download/v0.37.0/cadvisor -o /usr/bin/cadvisor && \
    chmod +x /usr/bin/cadvisor

RUN mkdir /app
WORKDIR /app

COPY index.js /app
#COPY counter.js /app
COPY ./metrics /app/metrics
#COPY gauge.js /app
#COPY histogram.js /app
#COPY summary.js /app

COPY --from=installer /app/package.json .
COPY --from=installer /app/node_modules ./node_modules

EXPOSE 8081

CMD ["pm2", "start", "index.js", "--no-daemon"]
