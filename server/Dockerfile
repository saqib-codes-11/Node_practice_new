# Define the image to use. Bookworm runs Node 20 inside a Debian container.
# View node:20-bookworm image here: https://hub.docker.com/_/node
FROM node:20-bookworm 
LABEL maintainer="Isaac Hunter, web@ikehunter.dev"

# Copy the package.json and package-lock.json files to the container.
COPY ./package.json /app/server/package.json
COPY ./package-lock.json /app/server/package-lock.json

# Set the working directory to /app/server
WORKDIR /app/server

# Install the dependencies inside container
RUN npm install

# Copy the rest of the files to the container
COPY ./src /app/server/src

# Expose port 3000 to the host
EXPOSE 1337

# Defines the command to run when the container starts
CMD ["npm", "start"]
