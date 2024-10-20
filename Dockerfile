FROM node:22-slim as dev
WORKDIR /app
EXPOSE 8000
RUN npm install -g vite
COPY ./package.json /app/package.json
RUN npm install
CMD ["vite"]

FROM node:22-alpine as builder
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . .
RUN vite build

# Build the React app using Vite
FROM nginx:alpine as prod
RUN mkdir -p /var/www
COPY --from=builder /app/dist /var/www/public
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
