FROM node:12.13-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.17 as production

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=development /usr/src/app/build/ /usr/share/nginx/html
