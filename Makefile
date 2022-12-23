include .env

ADMINIMG := natal-beneficente_natal-admin
CLIENTIMG := natal-beneficente_natal-client
ADMINVOL := natal-beneficente_natal-admin-modules
CLIENTVOL := natal-beneficente_natal-client-modules
ADMINLOCAL := admin
CLIENTLOCAL := client
ADMINCWD := /app
CLIENTCWD := /app
USER := $(shell /usr/bin/id -u)
ADMIN := natal-admin
CLIENT := natal-client

up:## Build the app container image (if it doesn't exists) and runs the containers
	docker-compose up

upBuild:## Rebuild the app container image and runs the containers
	docker-compose up --build

down:## Stop and remove the containers that was created by 'make up' command
	docker-compose down

clean:down ## Removes the images from the project to start brand new
	docker image rm  $(ADMINIMG) $(CLIENTIMG)
	docker volume rm $(ADMINVOL) $(CLIENTVOL)

install:## Runs 'yarn install'
	docker exec -it $(ADMIN) sh -c "(cd $(ADMINCWD) && rm yarn.lock && yarn install --force)"
	docker exec -it $(CLIENT) sh -c "(cd $(CLIENTCWD) && rm yarn.lock && yarn install --force)"

sync:## Syncs the external node_modules with the container for better intellisense
	cd $(ADMINLOCAL) && yarn install && cd ..
	cd $(CLIENTLOCAL) && yarn install && cd ..

build:## Runs 'yarn build'
	docker exec -it $(ADMIN) sh -c "(cd $(ADMINCWD) && yarn build)"
	docker exec -it $(CLIENT) sh -c "(cd $(CLIENTCWD) && yarn build)"

grant:## Grant permissions to all files (Use it if you have access permissions issues)
	bash -c "sudo chmod -R a+rw . && sudo chown -R $(USER):$(USER) ."

accessAdmin:## Run an interactive bash session on back-end container
	docker exec -it $(ADMIN) sh

accessClient:## Run an interactive bash session on front-end container
	docker exec -it $(CLIENT) sh

addAdmin: ## Adds selected dependencies to Admin container
	docker exec -it $(ADMIN) sh -c "(cd $(ADMINCWD) && yarn add $(deps))"

addClient:## Adds selected dependencies to Client container
	docker exec -it $(CLIENT) sh -c "(cd $(ADMINCWD) && yarn add $(deps))"
