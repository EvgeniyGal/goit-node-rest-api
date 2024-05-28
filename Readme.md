## What is this?

This is a Node.js REST API for managing contacts. It's built with Express.js and MongoDB.
All requests require a valid JWT token in the Authorization header.
Validation of request body, query params and path params is done using Joi.

## Features

- Register new user
- Login user
- Create, get, update and delete contacts
- Get all contacts
- Get one contact by id
- Delete one contact by id
- Update one contact by id
- Update status of one contact by id (change favorite status)
- Resend verification email
- Update user subscription
- Change user password

## How to start

1. Clone this repo
2. Run `npm install`
3. Create a `.env.example` file in the root of the project and add your MongoDB connection data
4. Run `npm start` to start the app in production mode

## How to run dev mode

1. Clone this repo
2. Run `npm install`
3. Create a `.env.example` file in the root of the project and add your MongoDB connection data
4. Run `npm run dev` to start the app in dev mode

## What should be in .env

This is what should be in your `.env.example` file:
SENDGRID_API_KEY =
DB_URL =
TEST_DB_URL =
JWT_SECRET =
PORT =
EMAIL_BASE_URL =

## How to build docker image

Just run the command:
docker build -t [name_you_image] .
