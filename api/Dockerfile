FROM deno:latest

WORKDIR /app

COPY . /app

EXPOSE 80

RUN deno install

CMD ["deno", "run", "-A", "-unstable-ffi", "main.ts"]