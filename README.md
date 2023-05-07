# Welcome to this CSTI Serverless TypeScript project

This is a Typescript and Serverless Framework project

## Tools

- TypeScript
- Serverless Framework
- AWS API Gateway
- AWS DynamoDB
- AWS DynamoDB Streams
- AWS LAMBDA
- AWS EventBridge
- AWS EventBridge Rule
- AWS Elasticache


## Useful commands

- `npm install` Install dependencies
- `npm run docker` Run dynamodb-local environment
- `npm run deploy` deploy this stack to your default AWS account/region
- `npm run remove` remove stack on your account

## API information
- [POST] https://7m8pz73o88.execute-api.us-east-1.amazonaws.com/dev/generate
- [GET] https://7m8pz73o88.execute-api.us-east-1.amazonaws.com/dev/find

- En esta aplicación se despliega una arquitectura de comunicación asíncrona basada en eventos,
para la producción/consumo de mensajes entre servicios de AWS, el servicio publicador consume los registros de una base de datos desde el endpoint POST brindado, y estos se envían a un event buss router cumpliendo con una regla definida para la aplicación, estos registros son enviados como mensajes a una cola de mensajería SQS para ser consumidos por un servicio lambda suscrito a ella, que posteriormente cumple con registrarlos en una tabla de DynamoDB, la cola de mensajería tiene vinculada una cola DLQ para los mensajes fallidos.
- Un DynamoDB Stream suscrito a la tabla de resultados enviará en un evento la información de un registro nuevo, posteriormente una lambda hará la réplica de la misma información.
- El servicio publicador es el que se encarga de ejecutar el algoritmo del juego LCR, cumpliendo con las especificaciones dadas por el juego de dados previamente brindada, que posee una complejidad algorítmica O de NxM, donde N es la cantidad de juegos y M es la cantidad máxima de lanzamientos de dados en cada juego.
- Al ejecutar el endpoint POST se estarán publicando 5 mensajes al event buss de mensajería para que estos sean guardados asincronamente en la tabla de resultados de DynamoDB. Los resultados se pueden consultar con el endpoint GET que adjunto a continuación.

![GET](https://res.cloudinary.com/dcwq9jz8t/image/upload/v1683477257/dev/csti-serverless_ff2bpt.jpg)


- Se implementa solución para el juego LCR.

![GET](https://res.cloudinary.com/dcwq9jz8t/image/upload/v1683420738/dev/juego-dados_g9t8ns.png)

```
curl --location --request POST 'https://7m8pz73o88.execute-api.us-east-1.amazonaws.com/dev/generate'

```
```
curl --location --request GET 'https://7m8pz73o88.execute-api.us-east-1.amazonaws.com/dev/find'
```

