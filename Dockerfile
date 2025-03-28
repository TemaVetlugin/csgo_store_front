FROM node:18-alpine as base
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm install
EXPOSE 3000

FROM base as builder
WORKDIR /app
COPY . .
ENV BUILD_STANDALONE true
RUN npm run build

FROM base as production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

CMD ["npm", "start"]

FROM base as dev
ENV NODE_ENV=development
COPY . .
CMD ["npm", "run", "dev"]
