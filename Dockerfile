# Build image
FROM node:16.20.0 as build

WORKDIR /usr/src/app

COPY --chown=node:node . ./

RUN npm ci --omit=dev

# Production Image
## Bullseyes uses Debian 11 with longer end-of-life date.
## Slim variant means smaller software component
FROM node:16.20.0-bullseye-slim

# Add dumb-init for proper signal handling https://cheatsheetseries.owasp.org/cheatsheets/NodeJS_Docker_Cheat_Sheet.html
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

ENV NODE_ENV production

USER node

WORKDIR /usr/src/app

COPY --chown=node:node --from=build /usr/src/app/ /usr/src/app/

EXPOSE 8080

# https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#cmd
CMD ["dumb-init", "node", "./bin/www" ]
