## What is this?

This is a Node.js REST API for managing contacts. It's built with Express.js and MongoDB.
All requests require a valid JWT token in the Authorization header.
Validation of request body, query params and path params is done using Joi.

## How to start

1. Clone this repo
2. Run `npm install`
3. Create a `.env` file in the root of the project and add your MongoDB connection data
4. Run `npm start` to start the app in production mode

## How to run dev mode

1. Clone this repo
2. Run `npm install`
3. Create a `.env` file in the root of the project and add your MongoDB connection data
4. Run `npm run dev` to start the app in dev mode

## What should be in .env

This is what should be in your `.env` file:
DB_USER = "YourLogin"
DB_PASSWORD = "YourPassword"
JWT_SECRET = "Super secret"
