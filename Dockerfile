FROM node:19-alpine3.17

WORKDIR /skywallet

COPY ./package.json .
COPY ./yarn.lock .

RUN apk add --no-cache git openssh
RUN yarn install && yarn cache clean --force

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "start" ]
