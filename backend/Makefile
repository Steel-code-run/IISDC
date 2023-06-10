docker_logs:
	docker compose logs -f backend

docker_migrate:
	docker compose exec -it backend npm run prisma:migrate

# заполнить бд тестовыми данными, запускать только если БД пустая
docker_fill:
	docker compose exec -it backend npm run prisma:seed