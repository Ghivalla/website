FROM node:14.15

ENV APP_PATH='/server'

RUN mkdir -p $APP_PATH
WORKDIR $APP_PATH

COPY package.json $APP_PATH
COPY yarn.lock $APP_PATH
RUN yarn install

COPY . $APP_PATH

EXPOSE 3001

CMD [ "yarn", "start" ]
