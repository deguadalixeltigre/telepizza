##  MENU SERVICE
A menu service is needed to let front applications to exchange data with database. Our menu service should be build using NodeJS 
and some framework of our choice. In this case "express" is an excellent framework to create our RESTful API microservices.

Typescript is the language that we will be using. For those unfamiliar with it, TypeScript is a typed superset of JavaScript that we compile 
to plain JavaScript, and, among many other things, allows us to add types to JavaScript.

Since we need a database to store our data, we will be using a dockerized instance of Mysql, together with Sequelize, an ODM which makes 
interacting with MySql that much easier.

Also we'll be using MongoDb and moongose to store logs and history data.

To securize al requests we'll be using and API KEY for our menu service. 

## Add records to database

There's a .sql file in folder "docs". Connect to mysql database with credentials store in .env file. Then run the .sql script file 
to populate database.

## Usage

```bash
docker-compose up --build -d
```

## TESTING THE API

There's a POSTMAN collection in folder "docs" to test the API.

