.PHONY: build
build:
	docker compose build --pull

.PHONY: start
start:
	docker compose up -d

.PHONY: status
status:
	docker compose ps

.PHONY: stop
stop:
	docker compose down

.PHONY: migrate
migrate:
	docker compose exec api bash -c 'deno task prisma migrate dev --skip-generate'