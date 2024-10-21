FROM denoland/deno as dev

ARG DATABASE_URL=
ENV DATABASE_URL=${DATABASE_URL}

WORKDIR /app

COPY . /app

RUN apt-get update -yqq && apt-get install -yqq openssl

RUN deno task prisma:generate

RUN deno task prisma migrate dev --skip-generate

CMD ["task", "dev"]

FROM denoland/deno as prod

ARG DATABASE_URL=
ENV DATABASE_URL=${DATABASE_URL}

RUN apt-get update -yqq && apt-get install -yqq openssl

WORKDIR /app

EXPOSE 9000

COPY . /app

RUN deno task prisma:generate

RUN deno cache src/main.ts

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "--allow-ffi", "src/main.ts"]