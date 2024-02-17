#!/bin/sh
npm run seed
npm start &
sleep 15
# keep container running
npm run test && tail -f /dev/null 

