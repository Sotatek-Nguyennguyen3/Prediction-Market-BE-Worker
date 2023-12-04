FROM node:16-alpine

WORKDIR /app/backend-api

COPY package.json ./

RUN yarn install

COPY . .

RUN npm run build

ENV NODE_ENV dev-api
ENV PORT 3201
ENV HTTPS_PORT 3243

CMD ["npm", "run", "start:prod-api"]
