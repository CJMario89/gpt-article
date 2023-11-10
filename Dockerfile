FROM node:18-alpine AS build

WORKDIR /app

COPY ./package-lock.json ./package-lock.json
COPY ./package.json ./package.json
RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/.next /app/.next

EXPOSE 3000

CMD ["npm", "start"]
