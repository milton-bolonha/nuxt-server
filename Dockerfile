# Use a base image with Node.js installed
FROM node:23.11.1-alpine3.22

# Build argument for image tag
ARG IMAGE_TAG=latest
ENV IMAGE_TAG=${IMAGE_TAG}

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package* ./

# Install dependencies
RUN npm install --verbose

# Copy the rest of the application code
COPY . .

# add a label for the image tag (metadata)
# LABEL image_tag=$IMAGE_TAG

# Command to run your application
CMD npm run build && node ./.output/server/index.mjs

