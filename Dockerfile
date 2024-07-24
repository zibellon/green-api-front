#################
#Build
#################
FROM --platform=linux/amd64 node:18.19.1-alpine AS build

WORKDIR /app

ARG REACT_APP_BACK_URL
ENV REACT_APP_BACK_URL=${REACT_APP_BACK_URL}

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install --frozen-lockfile

COPY tsconfig.json ./
COPY ./public ./public/
COPY ./src ./src/

RUN npx react-scripts build

#################
#Start
#################
FROM --platform=linux/amd64 node:18.19.1-alpine AS deploy

WORKDIR /app

RUN apk add bash && \
  yarn global add serve

COPY --from=build ./app/build ./build

CMD ["/bin/bash", "-c", "serve -s build"]