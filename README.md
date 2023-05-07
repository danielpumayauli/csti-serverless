# Welcome to this CSTI Serverless TypeScript project

This is a Typescript and Serverless Framework project

## Tools

- TypeScript
- Serverless Framework
- AWS API Gateway
- AWS DynamoDB
- AWS LAMBDA
- AWS EventBridge
- AWS EventBridge Rule
- AWS Elasticache for redis


## Useful commands

- `npm install` Install dependencies
- `npm run docker` Run dynamodb-local environment
- `npm run deploy` deploy this stack to your default AWS account/region
- `npm run remove` remove stack on your account

## API information
- Authorization Bearer is required
- [POST] https://7m8pz73o88.execute-api.us-east-1.amazonaws.com/dev/generate
- [GET] https://7m8pz73o88.execute-api.us-east-1.amazonaws.com/dev/find

- En esta aplicación se despliega una arquitectura de comunicación asíncrona basada en eventos,
para la producción / consumo de mensajes entre servicios de AWS, se consumen los registros de una base de datos desde el endpoint POST brindado, y estos se envían a un event buss router cumpliendo con una regla definida para la aplicación, estos registros son enviados como mensajes a una cola de mensajería SQS para ser consumidos por un servicio lambda suscrito a ella, que posteriormente cumple con registrarlos en una tabla de DynamoDB, la cola de mensajería tiene vinculada una cola DLQ para los mensajes fallidos.
El servicio publicador es el que se encarga de ejecutar el algoritmo del juego LCR, cumpliendo con las especificaciones dadas por el juego de dados previamente brindada.

![GET](https://res.cloudinary.com/dcwq9jz8t/image/upload/v1683421611/dev/csti-app_hogrsc.jpg)


- Se implementa solución para el juego LCR.

![GET](https://res.cloudinary.com/dcwq9jz8t/image/upload/v1683420738/dev/juego-dados_g9t8ns.png)

```
curl --location --request POST 'https://7m8pz73o88.execute-api.us-east-1.amazonaws.com/dev/generate'

```
```
curl --location --request GET 'https://7m8pz73o88.execute-api.us-east-1.amazonaws.com/dev/find'
```

