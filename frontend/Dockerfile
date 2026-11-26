FROM node:26.13.1-alpine3.24@sha256:6bd9ab43c0ec0190ca7b2d193906cb8b7edf6e7f4afa43ddeccd6452710bffb5 AS build

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json package-lock.json ./
ARG NPM_REGISTRY
RUN if [ -n "$NPM_REGISTRY" ]; then \
    export NPM_CONFIG_REGISTRY="$NPM_REGISTRY"; \
    fi; \
    npm ci && npm install --global pm2

COPY . /usr/src/app
RUN npm run build

FROM build AS production
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/build .
COPY --from=build /usr/src/app/entrypoint.sh .
RUN chmod +x entrypoint.sh

EXPOSE 8080

ENTRYPOINT [ "/usr/src/app/entrypoint.sh" ] 