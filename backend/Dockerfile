FROM node:lts-alpine

RUN mkdir app

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY tsconfig.json ./
COPY jest.config.js ./
COPY run-test-back.sh ./

RUN npm install

COPY src src
COPY public public

CMD npm start