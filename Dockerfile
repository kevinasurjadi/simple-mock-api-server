FROM hayd/alpine-deno:latest

EXPOSE 4000

WORKDIR /app

USER deno

COPY ./data .
COPY ./src .
COPY ./routes.json .

RUN deno cache index.js
