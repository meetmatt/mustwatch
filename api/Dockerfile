FROM denoland/deno as builder
WORKDIR /app
RUN apt-get update -yqq && apt-get install -yqq openssl
COPY . /app
RUN deno task prisma:generate

FROM builder as dev
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
ENV API_PORT=9000
EXPOSE 9000
RUN deno task prisma migrate dev --skip-generate
CMD ["task", "dev"]

FROM builder as prod
ENV API_PORT=80
EXPOSE 80
RUN deno cache src/main.ts
CMD ["run", "--allow-net", "--allow-env", "--allow-read", "--allow-ffi", "src/main.ts"]