FROM node:12-alpine

# Create app directory
WORKDIR /usr/src/app

# Do setup for running script
COPY package*.json ./
RUN npm install --only=production

# Copy app source
COPY . .

EXPOSE 8080
ENTRYPOINT [ "npm", "start" ]