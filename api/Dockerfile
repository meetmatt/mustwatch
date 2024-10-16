FROM denoland/deno:alpine

EXPOSE 80

WORKDIR /app

COPY . /app

RUN deno cache main.ts

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "main.ts"]