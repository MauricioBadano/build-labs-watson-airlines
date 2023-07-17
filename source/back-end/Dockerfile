# ------------------------------
# Stage 1: Application Building
# ------------------------------

# DOKERFILE REFERENCE: https://docs.docker.com/engine/reference/builder/

# Import NodeJS image
FROM --platform=linux/amd64 node:current-alpine as build

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
COPY . /usr/src/app/

RUN npm install

# ------------------------------
# Stage 2: Application Running
# ------------------------------

EXPOSE 8080

# Run application
CMD [ "node", "app.js" ]