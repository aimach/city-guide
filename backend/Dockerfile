FROM node:lts-alpine

RUN mkdir app

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY tsconfig.json ./
COPY jest.config.js ./
COPY init.sh ./

RUN npm install

COPY src src

CMD npm run seed && npm run test