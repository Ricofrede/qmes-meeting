# QMES Meeting

## Introduction

First Iberoamerican Meeting on Quantum Materials and Electronic Structures: Theory and Experiments.

## Initial Setup

Simply run the command `make up` to spin it up. Once the containers finish up building the admin panel will be available at `localhost:3001` and the client at `localhost:3000`.

## Dependencies

- ReactJS 18.0.17
- TypeScript *
- Vite 3.1.0
- Firebase 9
- FireCMS 2.0.0-alpha.41
- Material UI 5
- SASS 1.55
- Bootstrap 5.2.2

## Important Commands

| Command | Description |
| --- | --- |
| make up | Spins up the necessary containers |
| make down | Turn down containers and remove everything created with them |
| make upBuild | Spins up the necessary containers forcing their docker images to rebuild |
| make grant | Grants admin access to all files in case you run into privilege problems |
| make accessAdmin | Access admin container |
| make accessClient | Access client container |
| make addAdmin | Adds Node dependencies to admin container, must be run like `make deps="vite react" addAdmin` |
| make addClient | Adds Node dependencies to client container, must be run like `make deps="vite react" addClient` |
| make clean | Removes the images from the project to start brand new |
| make install | Install Node packages inside the containers |
| make sync | Runs `yarn install` locally (you must have yarn installed globally) to synchronize the external folder with the node_modules from the containers. Use this when you running into intellisense problems. Consider running `make install` before if this command alone doesn't solve the problem |
| make build | Run `yarn build` inside the containers |

## Important Links (DEV)

- `http://localhost:3000`: Client WebApp port.
- `http://localhost:3001`: Admin WebApp port.