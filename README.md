<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<h1 align="center">NestJS JWT Authentication</h1>

This repository demonstrates the implementation of authentication in a NestJS application using Passport and JWT (JSON Web Tokens).

### Description

- This project showcases how to integrate Passport and JWT authentication into a NestJS application. The application uses two levels of authentication guards:

  - Local Auth Guard: Used for email/password authentication.
  - JWT Auth Guard: Used for verifying JWT tokens on protected routes.

### Features

- User registration and login
- Secure endpoints with JWT-based authentication
- Swagger (OpenAPI) documentation available at /api-documentation
- PostgreSQL for database management

### Installation

- Set up the environment variables:

```sh
    cp .env.example .env
    # Edit .env with your preferred settings
```

### Running the Application

- Set up the PostgreSQL database:

  - Ensure PostgreSQL is installed and running on your machine.
  - Create the database specified in your .env file.

- To start the application, use the following command (Node >= v20):

```sh
yarn install
```

```sh
yarn start:dev
```

- The application will be running on http://localhost:3000.

### API Documentation

- You can access the Swagger (OpenAPI) API documentation at:

```bash
http://localhost:3000/api-documentation
```

### Authentication

#### Local Authentication

- The local authentication strategy uses an email and password combination to authenticate users. Once authenticated, the user receives a JWT token.

#### JWT Authentication

- JWT tokens are used to secure endpoints. After a user logs in using their credentials, they receive a JWT token that must be included in the Authorization header as a Bearer token in subsequent requests to protected routes.
  Example

#### Register a user to attempt a login:

```bash
POST /auth/register

{
"name": "your name",
"email": "your-email@example.com",
"password": "your-password"
}
```

#### Login to receive JWT token:

```bash
POST /auth/login

{
"email": "your-email@example.com",
"password": "your-password"
}
```

#### To receive the logged in user:

```bash
GET /auth/user
```

- On successful login, you will receive a JWT token:

```json
{
  "token": "your.jwt.token"
}
```

> - **use token to consume protected routes as an Authorization bearer token**
