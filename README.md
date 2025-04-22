# news-api

> [!WARNING]
> Work in progress

## ✨ Features

- ⚡ Express.js as the backend framework
- 📋 Swagger for API documentations
- 🛠 Typescript for strong type support
- 📄 Linting with ESlint and Prettier

## Endpoints

### Authentication

- GET /api/auth/login
- POST /api/auth/register

### Users

- GET /api/users
- GET /api/users/:user_id
- POST /api/users/
- DELETE /api/users/:user_id
- PATCH /api/users/:user_id

### Articles

- GET /api/articles with pagination and sorting
- GET /api/articles/:article_id
- POST /api/articles/
- DELETE /api/articles/:article_id
- PATCH /api/articles/:article_id

### Comments

- GET /api/comments
- GET /api/comments/:comment_id
- POST /api/comments/
- DELETE /api/comments/:comment_id
- PATCH /api/comments/:comment_id

### Topics

- GET /api/topics
- GET /api/topics/:topic_id
- POST /api/topics/
- DELETE /api/topics/:topic_id
- PATCH /api/topics/:topic_id

### Roles

- GET /api/roles
- GET /api/roles/:role_id
- POST /api/roles/
- DELETE /api/roles/:role_id
- PATCH /api/roles/:role_id

## Getting Started

### Prerequisites

- Node.js v22.14.0
- PostgreSQL

### Installation

1. Clone the repository using `git clone https://github.com/H4ckint0sh/news-api.git`
2. Install dependencies using `npm install`

### Running the development server

1. Create a `.env` file in the root directory and add the following variables:

```bash
PG_DATABASE=name_of_your_database
SECRET_KEY=your_secret_key
```

2.Seed the database using `npm run seed:dev`

3. Start the development server using `npm run start:dev`

## Todo

- [ ] Add tests useing vitest
- [ ] Add calendar routes
- [ ] Add prayer times routes
