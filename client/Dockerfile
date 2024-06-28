# Define the image to use. Bookworm runs Node 20 inside a Debian container.
# View node:20-bookworm image here: https://hub.docker.com/_/node
FROM node:20-bookworm AS setup
LABEL maintainer="Isaac Hunter, web@ikehunter.dev"

# Copy essential node & npm files to the container for initialization
COPY ./package.json /app/client/package.json
COPY ./package-lock.json /app/client/package-lock.json
COPY ./index.html /app/client/index.html
COPY ./vite.config.js /app/client/vite.config.js

# Set the working directory to /app/client
WORKDIR /app/client/

# Install the dependencies inside container
RUN npm install && \
    npm install -g rimraf

# Copy the rest of the files to the container
COPY ./src /app/client/src

# Build the app
RUN rimraf ./dist && \
    mkdir ./dist && \
    npm run build

# Creates a volume for the dist folder so that the server can access it
VOLUME /app/client/dist

# EXPOSE and CMD are not needed for the client container
# because it is not a server. It is only used to build the
# static files for the server to serve.