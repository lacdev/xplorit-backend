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

Verbs 

```js
GET, POST, PATCH, DELETE
```

Nouns/Resources

```js
users, places, routes, reviews, likes, states
```

## Users Endpoints

Create a new user account 

```js
POST v1/users/
``` 

Login with your account details

```js
POST v1/login/ 
```

JSON String that should be sent in in the previous endpoints:

```json
{
"email": "example@example.com",
"password": "testpass123"
}
```

Get user account details 

```js
GET v1/users/me BEARER
```

Update User's Password 

```js
PATCH v1/users/me/password BEARER
```

Update User's Username 

```js
PATCH v1/users/me/username BEARER
```
Update User's Avatar

```js
PATCH v1/users/me/avatar BEARER
```

Update User's Cover

```js
PATCH v1/users/me/cover BEARER
```

Get User likes given on places or routes.

```js
PATCH v1/users/me/likes BEARER
```

Get User reviews given to places or routes

```js
PATCH v1/users/me/reviews BEARER
```

Get places created by User

```js
PATCH v1/users/me/places BEARER
```

Get routes created by User

```js
PATCH v1/users/me/routes BEARER
```

***

## Places Endpoints

Get all places

```js
GET v1/places 
```

Users can filter places by specific query strings.

```js
lng = "Required valid geolocation longitude float number in order to construct the geolocation search."
lat = "Required valid geolocation latitude float number in order to construct the geolocation search."
distance = "Returns places inside a radius distance, requires a valid latitude and longitude."
q = "Returns places that includes the given keyword searches through objects description, name, state and city."
tags = "Returns places that strictly contains the selected tags." 
page = "Optional query to search through a particular page in the paginated results."
limit = "Optional query to limit the number of items returned per page."
sort = "Sort the results. By default average sorting is given. Options are: likes, average, createdAt"
```

Example of a filtered place query:

```js
GET v1/places?q=queretaro&distance=5&lat=41.40338&lng=2.17403&tags=familiar,aventura&page=2&limit=2&sort=average
```

Get a particular place by Id

```js
GET v1/places/:placeId 
```

Create a new place 

```js
POST v1/places/ BEARER
```

Update a place by Id

```js
PATCH v1/places/:placeId BEARER
```

***

## Routes Endpoints

Get all routes

```js
GET v1/routes
```

Users can filter routes by specific query strings.

```js
lng = "Required valid geolocation longitude float number in order to construct the geolocation search."
lat = "Required valid geolocation latitude float number in order to construct the geolocation search."
distance = "Returns places inside a radius distance, requires a valid latitude and longitude."
q = "Returns places that includes the given keyword searches through objects description, name, state and city."
tags = "Returns places that strictly contains the selected tags." 
page = "Optional query to search through a particular page in the paginated results."
limit = "Optional query to limit the number of items returned per page."
sort = "Sort the results. By default average sorting is given. Options are: likes, average, createdAt"
```

Example of a filtered route query:

```js
GET v1/routes?q=queretaro&distance=5&lat=41.40338&lng=2.17403&tags=familiar,aventura&page=2&limit=2&sort=average
```

Get a particular route by Id

```js
GET v1/routes/:routeId 
```

Create a new route

```js
POST v1/routes/ BEARER
```

Update a route by Id

```js
PATCH v1/routes/:routeId BEARER
```

*** 

## Places Likes and reviews endpoints

### Likes endpoints

Get all likes from a particular place

```js
GET v1/places/:placeId/likes 
```

Post a new like in a particular place

```js
POST v1/places/:placeId/likes BEARER
```

Delete a new like in a particular place

```js
DELETE v1/places/:placeId/likes BEARER
```

### Reviews endpoints

Get all reviews from a particular place

```js
GET v1/places/:placeId/reviews
```

Post a new review in a particular place

```js
POST v1/places/:placeId/reviews BEARER
```

Update a review in a particular place

```js
PATCH v1/places/:placeId/reviews/:reviewId BEARER
```

*** 

## Routes Likes and reviews endpoints

### Likes endpoints

Get all likes from a particular route

```js
GET v1/routes/:routeId/likes 
```

Post a new like in a particular route

```js
POST v1/routes/:routeId/likes BEARER
```

Delete a new like in a particular route

```js
DELETE v1/routes/:routeId/likes BEARER
```

### Reviews endpoints

Get all reviews from a particular route

```js
GET v1/routes/:routeId/reviews
```

Post a new review in a particular route

```js
POST v1/routes/:routeId/reviews BEARER
```

Update a review in a particular route

```js
PATCH v1/routes/:routeId/reviews/:reviewId BEARER
```

*** 

## States Endpoint

Get all states in order to use the filters

```js
GET v1/states
```

*** 

## Conclusion

Hopefully this project can lead to any clue or where I am at this particular point in time. I'm always studying, practicing and creating new projects to keep growing my skills and experience.

Any comments, feedback and contributions are always welcomed.
