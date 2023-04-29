# Полная очистка docker
docker_clear:
	docker compose stop; \
	docker image rm iisdc-backend -f; \
	docker image rm mysql:5.7 -f; \
	docker image rm phpmyadmin/phpmyadmin -f; \
	docker compose rm -f; \
	docker builder prune -f; \
	docker volume prune -f; \

# запуск контейнеров
docker_start:
	docker compose up -d

# зайти в контейнер бекенда
docker_backend_sh:
	docker compose exec backend sh

# остановить контейнеры
docker_stop:
	docker compose stop

# сделать миграцию бд
docker_migrate:
	docker compose exec -it backend npm run prisma:migrate

# сделать дамп базы данных
docker_dump:
	docker compose exec -it mysql mysqldump -uroot -proot --all-databases > ./docker/mysql/dump.sql