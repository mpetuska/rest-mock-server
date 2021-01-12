FROM node:14-alpine

ENV PORT=7000

WORKDIR /app
COPY dist/ .

EXPOSE $PORT
ENTRYPOINT node main.js
