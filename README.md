## Installation

```bash
git clone
cd todo
```

## Set envs from example file
```bash
cp .env.example .env
```

## Run docker compose
```bash
docker-compose -f ./docker-compose.yml up
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

## Use postman collection to test app
```
todo.postman_collection.json
```
1. Create user
```
POST localhost:3000/users
{   
    "email": "test@test.com",
    "password": "123456",
    "firstName": "test"
}
```
2. Login
```
POST localhost:3000/auth/login
{   
    "email": "test@test.com",
    "password": "123456"
}
```
3. Get access token and set as Bearer in postman
4. Create post entity
```
POST localhost:3000/auth/login
{
    "content": "test content",
    "title": "test title"
}
```
5. Use other endpoint from list





