FROM node:18-alpine

COPY package*.json ./
RUN npm install

RUN env

COPY . .
RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]