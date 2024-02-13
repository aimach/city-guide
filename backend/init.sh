#!/bin/sh
npm run seed
npm start &
sleep 10
npm run test

