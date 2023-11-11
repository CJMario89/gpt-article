FROM node:18-alpine AS build

WORKDIR /app

COPY ./package-lock.json ./package-lock.json
COPY ./package.json ./package.json
RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

FROM node:18-alpine

WORKDIR /app

RUN npm install -g pm2

COPY --from=build /app/.next /app/.next
COPY --from=build /app/node_modules /app/node_modules

EXPOSE 3000

CMD ["pm2-runtime", "start", "npm start"]
