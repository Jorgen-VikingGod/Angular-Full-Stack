FROM node:12.18.2

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run predev && npm run buildprod
EXPOSE 3000
CMD [ "npm", "start" ]