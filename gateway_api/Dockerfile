FROM node:22 AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install


COPY . .

RUN yarn build && yarn prisma generate


FROM node:22

WORKDIR /app

COPY --from=builder /app /app

RUN yarn --only=production

EXPOSE 3020


CMD ["yarn", "start:prod"]
