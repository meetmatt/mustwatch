FROM oven/bun:latest as installer
WORKDIR /app
COPY package.json bun.lockb /app/
RUN bun install
COPY . .

FROM installer as dev
EXPOSE 8000
CMD ["vite"]

FROM installer as prod-builder
RUN bun run build

FROM nginx:alpine as prod
EXPOSE 80
RUN mkdir -p /var/www
COPY --from=prod-builder /app/dist /var/www/public
COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]
