FROM node:14

WORKDIR /app

COPY ./api/package*.json ./

RUN npm install

COPY ./api/index.js .

EXPOSE 3000

CMD ["npm", "start"]
