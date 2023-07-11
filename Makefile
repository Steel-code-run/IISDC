# Полная очистка docker
docker_clear:
	docker compose stop; \
	docker image rm iisdc-backend -f; \
	docker image rm mysql:5.7 -f; \
	docker image rm phpmyadmin/phpmyadmin -f; \
	docker image rm iisdc-parsers -f; \
	docker compose rm -f; \
	docker builder prune -f; \
	docker volume prune -f;

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

docker_apply_migrations:
	docker compose exec -it backend npm run prisma:migrate:apply

# заполнить бд тестовыми данными, запускать только если БД пустая
docker_fill:
	docker compose exec -it backend npm run prisma:seed

# сделать дамп базы данных
docker_dump:
	docker compose exec -it mysql mysqldump -uroot -proot --all-databases > ./docker/mysql/dump.sql

docker_prod_build:
	docker compose -f docker-compose.prod.yml up -d --build --force-recreate

docker_prod_build_frontend:
	docker compose -f docker-compose.prod.yml up -d --build --force-recreate frontend

docker_prod_build_backend:
	docker compose -f docker-compose.prod.yml up -d --build --force-recreate backend

docker_prod_build_parsers:
	docker compose -f docker-compose.prod.yml up -d --build --force-recreate parsers

docker_prod_build_admin:
	docker compose -f docker-compose.prod.yml up -d --build --force-recreate admin
