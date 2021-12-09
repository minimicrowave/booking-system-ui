# container base image
FROM node:16-alpine as build

# set working dir
WORKDIR /workspace/app

# copy & install dependencies
COPY package*.json ./
RUN npm install

COPY . .

# generate production build
RUN npm run build

# NGINX Config
FROM nginx:1.17.8-alpine

# copy static assets/build to nginx dir
COPY --from=build /workspace/app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

# run nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]