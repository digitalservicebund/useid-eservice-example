# Bullseyes uses Debian 11 with longer end-of-life date. Slim variant means smaller software component
FROM node:16.20.0-bullseye-slim as build

RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --omit=dev

EXPOSE 8080

USER node

# https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#cmd
CMD ["dumb-init", "node", "./bin/www" ]
