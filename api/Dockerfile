FROM denoland/deno as dev

WORKDIR /app

COPY . /app

EXPOSE 80

CMD ["task", "dev"]

FROM denoland/deno as prod

COPY . /app

RUN deno cache src/main.ts

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "src/main.ts"]