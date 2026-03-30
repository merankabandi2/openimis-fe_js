# =============================================================================
# Dev stage — full source copy for local development
# =============================================================================
FROM node:20 AS dev-stage

RUN apt-get update && apt-get install -y nano openssl software-properties-common

RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/ssl/private/privkey.pem \
    -out /etc/ssl/private/fullchain.pem \
    -subj "/C=DE/ST=_/L=_/O=_/OU=_/CN=localhost"

RUN mkdir -p /home/node/.npm-global \
    && chown node:node /home/node/.npm-global \
    && npm config set prefix /home/node/.npm-global \
    && mkdir -p /usr/local/lib/node_modules \
    && chown node:node /usr/local/lib/node_modules \
    && npm config set prefix /usr/local/lib/node_modules

RUN mkdir /app
WORKDIR /app
COPY ./ /app
RUN chown node:node /app -R

ARG OPENIMIS_CONF_JSON
ENV OPENIMIS_CONF_JSON=${OPENIMIS_CONF_JSON}
ENV NODE_ENV=development
USER node
ENTRYPOINT ["/bin/bash", "/app/script/entrypoint-dev.sh"]

# =============================================================================
# System stage — OS deps + SSL cert, NO source code (base for production build)
# =============================================================================
FROM node:20 AS system-stage

RUN apt-get update && apt-get install -y openssl \
    && rm -rf /var/lib/apt/lists/*

RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/ssl/private/privkey.pem \
    -out /etc/ssl/private/fullchain.pem \
    -subj "/C=DE/ST=_/L=_/O=_/OU=_/CN=localhost"

RUN mkdir -p /home/node/.npm-global \
    && chown node:node /home/node/.npm-global \
    && mkdir /app \
    && chown node:node /app

WORKDIR /app
USER node
RUN npm config set prefix /home/node/.npm-global

# =============================================================================
# Deps stage — install base dependencies (cached unless package*.json changes)
# =============================================================================
FROM system-stage AS deps-stage

COPY --chown=node:node package*.json ./

# Configure npm for flaky internet resilience
RUN npm config set fetch-retry-mintimeout 20000 \
    && npm config set fetch-retry-maxtimeout 120000 \
    && npm config set fetch-timeout 300000 \
    && npm config set audit false \
    && npm config set fund false

RUN npm install --include=dev --legacy-peer-deps --ignore-scripts || \
    (echo "First attempt failed, retrying in 10s..." && sleep 10 && \
     npm install --include=dev --legacy-peer-deps --ignore-scripts)

# =============================================================================
# Build stage — load config, install module deps, build
# =============================================================================
FROM deps-stage AS build-stage

# Cache-busting arg: rebuild from here without re-downloading base deps
# Usage: docker build --build-arg CACHE_BUST=$(date +%s) .
ARG CACHE_BUST=1
RUN echo "Cache bust: ${CACHE_BUST}"

ARG OPENIMIS_CONF_JSON
ENV OPENIMIS_CONF_JSON=${OPENIMIS_CONF_JSON}
ENV GENERATE_SOURCEMAP=true
ENV NODE_ENV=production

COPY --chown=node:node ./ ./

RUN npm run load-config

# Re-install to pick up modules added by load-config
RUN npm install --include=dev --legacy-peer-deps || \
    (echo "First attempt failed, retrying in 10s..." && sleep 10 && \
     npm install --include=dev --legacy-peer-deps)

RUN npm run build

# Pre-compress static assets for nginx gzip_static
RUN find ./build -type f \( -name "*.js" -o -name "*.css" -o -name "*.html" -o -name "*.svg" -o -name "*.json" \) \
    -size +1k -exec gzip -9 -k {} \;

# =============================================================================
# Final NGINX stage
# =============================================================================
FROM nginx:latest

COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY --from=build-stage /etc/ssl/private/ /etc/nginx/ssl/live/host
COPY ./conf /conf
COPY ./script/entrypoint.sh /script/entrypoint.sh
RUN openssl dhparam -out /etc/nginx/dhparam.pem 2048
RUN chmod a+x /script/entrypoint.sh
WORKDIR /script

ENV DATA_UPLOAD_MAX_MEMORY_SIZE=12582912
ENV NEW_OPENIMIS_HOST="localhost"
ENV PUBLIC_URL="front"
ENV REACT_APP_API_URL="api"
ENV REACT_APP_SENTRY_DSN=""
ENV ROOT_MOBILEAPI="rest"
ENV FORCE_RELOAD=""
ENV OPENSEARCH_PROXY_ROOT="opensearch"

ENTRYPOINT ["/bin/bash", "/script/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
