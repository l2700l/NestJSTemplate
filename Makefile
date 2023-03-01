dev:
	docker-compose -f docker-compose.yml start
	npm run start:dev
stop:
	docker-compose -f docker-compose.yml stop