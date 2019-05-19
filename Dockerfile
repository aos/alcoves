FROM node:10-alpine

RUN apk update && apk upgrade && \
      echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
      echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
      apk add --no-cache \
      chromium@edge=72.0.3626.121-r0 \
      nss@edge \
      freetype@edge \
      harfbuzz@edge \
      ttf-freefont@edge

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
RUN addgroup -S pptruser && adduser -S -g pptruser pptruser \
    && mkdir -p /home/pptruser/Downloads /app/images \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app

USER pptruser
WORKDIR /app

COPY package*.json ./
RUN npm cache clean --force && npm install

# Copy application source code to image after npm install so that
# application code changes don't bust the docker cache of npm install step
COPY . .
ENV USING_DOCKERFILE true

CMD ["node", "index.js"]
