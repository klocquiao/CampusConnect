# https://hub.docker.com/_/node
FROM node:21.7.1

# Copy local code to the container image.
ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . ./

# Install production dependencies.
RUN yarn install
RUN yarn build
COPY . ./

# Start the app
CMD [ "yarn", "start" ]