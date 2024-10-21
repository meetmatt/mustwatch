FROM denoland/deno as dev

ARG DATABASE_URL=
ENV DATABASE_URL=${DATABASE_URL}

WORKDIR /app

COPY . /app

RUN apt-get update -yqq && apt-get install -yqq openssl

RUN deno task prisma:generate

RUN deno task prisma migrate dev --skip-generate || env

CMD ["task", "dev"]

FROM denoland/deno as prod

WORKDIR /app

COPY . /app

EXPOSE 9000

RUN deno cache src/main.ts

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "src/main.ts"]