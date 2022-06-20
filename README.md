## How to run

```sh
$ docker-compose up
$ docker ps --filter "name=med-backend_backend" -q
> af43649165b1 # for example
$ docker exec -it af43649165b1 /bin/sh
$ yarn knex migrate:latest
# backend will be ready on port 4000
```
