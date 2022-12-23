FROM node:16-alpine

WORKDIR /app

COPY package.json ./

RUN yarn install

EXPOSE 5173

COPY . .

CMD ["yarn", "dev", "--host"]