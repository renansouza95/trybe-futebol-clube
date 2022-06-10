FROM node:16-alpine

WORKDIR /app

EXPOSE 3001

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]