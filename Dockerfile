FROM node:22
WORKDIR /app

COPY package*.json ./
RUN npm ci

ARG POSTGRESQL_CONNECTION_STRING
ENV POSTGRESQL_CONNECTION_STRING=${POSTGRESQL_CONNECTION_STRING}
EXPOSE 3000
COPY . ./

# Wrap process in Tini so we can exit correctly
ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

# Principle of least privilege
USER node

CMD ["node", "./src/main.js"]
