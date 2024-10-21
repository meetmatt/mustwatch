FROM denoland/deno as builder

ARG DATABASE_URL=
ENV DATABASE_URL=${DATABASE_URL}

WORKDIR /app
ENV PORT=9000
EXPOSE 9000

COPY . /app

RUN apt-get update -yqq && apt-get install -yqq openssl
RUN deno task prisma:generate
RUN deno task prisma migrate dev --skip-generate

FROM builder as dev
CMD ["task", "dev"]

FROM builder as prod
RUN deno cache src/main.ts
CMD ["run", "--allow-net", "--allow-env", "--allow-read", "--allow-ffi", "src/main.ts"]