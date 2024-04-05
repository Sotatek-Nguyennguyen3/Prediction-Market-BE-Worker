FROM node:16-alpine

WORKDIR /app/backend-worker

COPY package.json ./

RUN npm install -f

COPY . .

RUN npm run build

ENV NODE_ENV dev-api
ENV PORT 3302
ENV HTTPS_PORT 4003

CMD ["npm", "run", "start:dev"]

