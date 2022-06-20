## How to run

### Development

```sh
$ docker-compose -f docker-compose.dev.yml up -d
$ docker ps --filter "name=test-202206-backend_backend" -q
> af43649165b1 # for example
$ docker exec -it af43649165b1 /bin/sh
$ yarn knex migrate:latest
# backend will be ready on port 4000
```

### Production

```sh
$ docker-compose -f docker-compose.prod.yml up -d
$ docker ps --filter "name=test-202206-backend_backend" -q
> af43649165b1 # for example
$ docker exec -it af43649165b1 /bin/sh
$ yarn knex migrate:latest
# backend will be ready on localhost:4000
# Production compose file also contains frontend server
# It works on localhost:3000
```
