FROM node:lts-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile && yarn cache clean

COPY . .

RUN yarn build

CMD ["node", "dist/index.js"]
