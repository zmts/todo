## Installation


```bash
$ git clone
cd repo-name
```

```bash
$ npm install
```

## Set envs from example file
```
cp .env.example .env
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Endpoints
```
POST    localhost:3000/auth/login

POST    localhost:3000/users
GET     localhost:3000/users/current

GET     localhost:3000/posts/:uuid
POST    localhost:3000/posts
PATHC   localhost:3000/posts/:uuid
GET     localhost:3000/posts?pagination[limit]=2&pagination[offset]=2&filter[isFeatured]=true&order[field]=title&order[direction]=DESC
GET     localhost:3000/posts/:uuid
DELETE  localhost:3000/posts/:uuid
```

## Postman-collection
```
todo.postman_collection.json
```

## Run docker compose
```
docker-compose -f ./docker-compose.yml up
```







