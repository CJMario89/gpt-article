FROM node:18-alpine

WORKDIR /app

RUN npm install -g pm2

COPY ./package-lock.json ./package-lock.json
COPY ./package.json ./package.json
RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["pm2-runtime", "start", "npm start"]
