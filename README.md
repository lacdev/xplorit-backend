# About this project

Xplorit was created in order to help travelers around the world to find a place where they can learn more about the next places they would like to visit. In order to make this more focused on the community rather than the product itself, users are encouraged to contribute to the website. Adding new places, routes and leaving reviews or likes to a places that, perhaps they already visited in the past.

This project was the capstone project of our bootcamp. We were a team of 4 highly motivated Junior Engineers.

I personally was in charge of everything related to the backend, cloud deployment on AWS, consuming services from Google Cloud Platform, the database which was deployed on MongoDB Atlas and everything in between.

***

## What I've learnt:

- A little bit about Clean Architecture and code modularization ( Thanks uncle Bob )
- Cloud EC2 instance deployment on AWS.
- A little bit about NGINX and PM2 as process manager.
- Concepts and services from Google Cloud Platform.
- Intermediate to (maybe advanced?) concepts about Node.js and Express.
- The Mongoose Framework and the MongoDB NoSQL databse and some useful concepts beyond basic queries.
- Correct Middleware and routing implementation on Node.js server applications. 
- Password security hashing and comparison with Bcrypt.
- JWT Authentication implementation from scratch.
- Error handling and validators implementation.
- Rate limiting and the fixed window algorithm.
- Some security best practices in order to make our app more secure.
- Database Schema modeling following MongoDB best practices.
- Relationships in MongoDB.
- Dynamic Data filtering through query strings.
- More stuff...

I personally feel great about this project, it was challenging and difficult but we managed to finish it as a team. I'm grateful about my teammates who always were supporting each other. 

***

## Database Schema Modeling and relationships.

![Database_Design](https://storage.googleapis.com/xplorit-images/docs/database1.PNG)

Here we can see some of the example in how the database schema design was implemented. All the relationships are made through schema references. No arrays that can grow out of control are implemented in each document schema as MongoDB suggest since 16mb is the limit for each document.

***

## System Architecture design.

![System_Architecture_Design](https://storage.googleapis.com/xplorit-images/docs/architecture1.PNG)

This is how we personally choosed to implement our system and the way it behaves while communicating with other services. It's a basic system design. I learnt more about how to actually reason the system implementation before ever writing any line of code. 

This is where the implementation of the Clean Code Architecture comes into play in our server design. There are several layers that are taking care of the requests.

In roughly particular order:

- General Middlewares
- Routers
- Rate Limiters for specific routes
- Token Verification for specific routes
- Request Validators tailored for specific routes
- Request Controllers 
- Request Usecases
- Connection to the database through the Mongoose Model methods.

***

## REST API Endopoints Documentation

Here we can see a detailed explanation of each endpoint on the system and what are the parameters and query strings needed for each one of them.

Protected routes will have the **Bearer** word on it in order to explain that we need a valid JWT Token in order to access that resource.

### Users

Create a new user account 

```js
POST v1/users/
``` 

Login with your account details

```js
POST v1/login/
```

Get user account details ***protected***

```js
GET v1/users/me
```
