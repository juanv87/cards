FROM node:16-alpine

RUN mkdir -p /cards

WORKDIR /cards

COPY package.json /cards

RUN yarn install

COPY . /cards

RUN yarn build

# USER nextjs

EXPOSE 3000

CMD ["yarn", "start"]

