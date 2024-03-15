FROM node:21.6.1-alpine3.18

WORKDIR /usr/app
ENV NODE_ENV development
ENV PATH /usr/app/node_modules/.bin:$PATH

COPY ./package*.json ./
RUN npm ci
COPY . ./

EXPOSE 5173
CMD ["npm", "run", "start:dev"]