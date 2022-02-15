# ARG is the only instruction that can precede the FROM instruction in the Dockerfile.
ARG NODE_REPOSITORY=node:16.5.0-alpine
# Base image
FROM $NODE_REPOSITORY

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV
RUN echo Token Secret: $NODE_ENV
RUN echo Environment: $NODE_ENV
ARG MENUS_API_PORT
ENV MENUS_API_PORT=$MENUS_API_PORT
ARG DB_USERNAME
ENV DB_USERNAME=$DB_USERNAME
ARG DB_PASSWORD
ENV DB_PASSWORD=$DB_PASSWORD
ARG DB_NAME
ENV DB_NAME=$DB_NAME
ARG DB_HOST
ENV DB_HOST=$DB_HOST
ARG DB_DIALECT
ENV DB_DIALECT=$DB_DIALECT
ARG DB_PORT
ENV DB_PORT=$DB_PORT
ARG TOKEN_EXPIRATION
ENV TOKEN_EXPIRATION=$TOKEN_EXPIRATION
RUN echo Token Expiration: $TOKEN_EXPIRATION
ARG TOKEN_TYPE
ENV TOKEN_TYPE=$TOKEN_TYPE
ARG TOKEN_SECRET
ENV TOKEN_SECRET=$TOKEN_SECRET
ARG REFRESH_TOKEN_SECRET
ENV REFRESH_TOKEN_SECRET=$REFRESH_TOKEN_SECRET
ARG REFRESH_TOKEN_EXPIRATION
ENV REFRESH_TOKEN_EXPIRATION=$REFRESH_TOKEN_EXPIRATION
RUN echo Token Secret: $TOKEN_SECRET
RUN echo Refresh Token Secret: $REFRESH_TOKEN_SECRET

# Export environment variables
RUN export NODE_ENV=$NODE_ENV
RUN export MENUS_API_PORT=$MENUS_API_PORT
RUN export DB_USERNAME=$DB_USERNAME
RUN export DB_PASSWORD=$DB_PASSWORD
RUN export DB_NAME=$DB_NAME
RUN export DB_HOST=$DB_HOST
RUN export DB_DIALECT=$DB_DIALECT
RUN export DB_PORT=$DB_PORT
RUN export TOKEN_EXPIRATION=$TOKEN_EXPIRATION
RUN export TOKEN_TYPE=$TOKEN_TYPE
RUN export TOKEN_SECRET=$TOKEN_SECRET
RUN export REFRESH_TOKEN_EXPIRATION=$REFRESH_TOKEN_EXPIRATION
RUN export REFRESH_TOKEN_SECRET=$REFRESH_TOKEN_SECRET

# Create Directory for the Container
WORKDIR /usr/src/app
# Only copy the package.json file to work directory
COPY package.json .
# Install all Packages
RUN npm install
# Copy all other source code to work directory
ADD . /usr/src/app
# Exposing the RestAPI port	
EXPOSE $MENUS_API_PORT
# Start
CMD [ "npm", "start" ]