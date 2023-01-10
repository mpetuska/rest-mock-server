FROM node:19-alpine

ENV PORT=7000
ENV DISABLE_CORS=false

RUN adduser -S bronius
USER bronius
WORKDIR /home/bronius
COPY dist/ .

EXPOSE $PORT
ENTRYPOINT ["node", "main.js"]
