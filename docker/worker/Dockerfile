FROM node:16-alpine

WORKDIR /app/backend-worker

COPY package.json ./

RUN npm install -f

COPY . .

RUN npm run build

ENV NODE_ENV dev-worker
ENV PORT 3301
ENV HTTPS_PORT 4443

CMD ["npm", "run", "start:prod-worker"]
