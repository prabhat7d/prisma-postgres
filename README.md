# Prisma PostgreSQL Demo

A REST API built with Node.js, Express.js, TypeScript, Prisma ORM, and PostgreSQL.

## Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- bcryptjs
- Zod

## Features

- JWT-based authentication
- Password hashing using bcrypt
- Protected API routes
- User-specific post listing
- Pagination
- Request validation using Zod
- Layered architecture
- Centralized error handling
- Graceful shutdown

## Project Structure

```text
prisma-postgres-demo/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── generated/
│   └── prisma/
├── src/
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   └── post.controller.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   └── post.service.ts
│   ├── repositories/
│   │   ├── user.repository.ts
│   │   └── post.repository.ts
│   ├── requests/
│   │   ├── login.request.ts
│   │   └── pagination.request.ts
│   ├── resources/
│   │   ├── auth.resource.ts
│   │   └── post.resource.ts
│   ├── middleware/
│   │   └── require-auth.ts
│   ├── lib/
│   │   └── prisma.ts
│   ├── routes/
│   │   ├── auth.ts
│   │   └── posts.ts
│   └── server.ts
├── prisma.config.ts
├── seed.ts
├── .env
├── .gitignore
├── package.json
└── tsconfig.json
```

## Installation

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd prisma-postgres-demo
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/prisma_demo"
JWT_SECRET="your-secure-jwt-secret"
PORT=3000
```

### 4. Create the Database

```sql
CREATE DATABASE prisma_demo;
```

### 5. Run Migrations

Apply committed migrations:

```bash
npx prisma migrate deploy
npx prisma generate
```

For new schema changes during development:

```bash
npx prisma migrate dev --name migration_name
```

### 6. Seed the Database

```bash
npx tsx seed.ts
```

### Demo Credentials

| Name | Email | Password |
|---|---|---|
| Rahul | rahul@example.com | Rahul@123 |
| Priya | priya@example.com | Priya@123 |

### 7. Start the Development Server

```bash
npm run dev
```

Server URL: `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Authentication | Description |
|---|---|---|---|
| GET | `/health` | No | Health check |
| POST | `/api/auth/login` | No | Authenticate a user |
| GET | `/api/posts` | Yes | Get authenticated user's posts |

## API Examples

### 1. Health Check

```bash
curl http://localhost:3000/health
```

### 2. Login

**Request**

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "rahul@example.com",
    "password": "Rahul@123"
  }'
```

**Example response**

```json
{
  "data": {
    "token": "YOUR_JWT_TOKEN",
    "tokenType": "Bearer",
    "expiresIn": "1h",
    "user": {
      "id": 1,
      "name": "Rahul",
      "email": "rahul@example.com"
    }
  }
}
```

Copy the returned token and use it in subsequent requests.

### 3. Get Authenticated User's Posts

```bash
curl -X GET "http://localhost:3000/api/posts" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 4. Get Posts with Pagination

**Page 1 — 10 posts**

```bash
curl -X GET "http://localhost:3000/api/posts?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Page 2 — 10 posts**

```bash
curl -X GET "http://localhost:3000/api/posts?page=2&limit=10" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Page 1 — 1 post**

```bash
curl -X GET "http://localhost:3000/api/posts?page=1&limit=1" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Example response**

```json
{
  "data": [
    {
      "id": 1,
      "title": "Learning Node.js",
      "content": "Understanding Node.js fundamentals",
      "published": true,
      "createdAt": "2026-10-14T10:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalItems": 2,
    "totalPages": 1
  }
}
```

### 5. Login as Priya

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "priya@example.com",
    "password": "Priya@123"
  }'
```

Use Priya's returned token to retrieve her posts:

```bash
curl -X GET "http://localhost:3000/api/posts?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

Each user can access only their own posts.

## Pagination Parameters

| Parameter | Default | Validation | Description |
|---|---|---|---|
| `page` | 1 | Integer >= 1 | Page number |
| `limit` | 10 | Integer between 1 and 100 | Number of posts per page |

## Error Responses

| HTTP Status | Description |
|---|---|
| 400 | Invalid request data |
| 401 | Invalid credentials or authentication |
| 404 | Route not found |
| 500 | Internal server error |

**Example**

```json
{
  "message": "Invalid credentials"
}
```

## Useful Commands

```bash
# Start development server
npm run dev

# Start server
npm start

# Generate Prisma Client
npx prisma generate

# Create a migration
npx prisma migrate dev --name migration_name

# Apply committed migrations
npx prisma migrate deploy

# Open Prisma Studio
npx prisma studio

# Seed database
npx tsx seed.ts
```

## Security

- Passwords are hashed using bcrypt.
- JWT secrets are stored in environment variables.
- Protected endpoints require a valid Bearer token.
- Database queries are scoped to the authenticated user.
- Request data is validated using Zod.
- Never commit `.env` or expose secrets.
- Demo credentials are for local development only.

## License

This project is intended for learning and demonstration purposes.
