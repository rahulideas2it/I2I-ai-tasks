# Note Taking App - Backend API

A RESTful API built with Express.js, TypeScript, and PostgreSQL for a note-taking application.

## Features

- **Authentication**: JWT-based login/signup
- **Notes CRUD**: Create, read, update, delete notes
- **Security**: Helmet, CORS, input validation
- **Documentation**: Swagger/OpenAPI docs
- **Database**: PostgreSQL with Knex.js
- **Testing**: Jest unit tests
- **Logging**: Winston + Morgan
- **Database Viewer**: pgweb on port 8080

## Tech Stack

- **Node.js** with TypeScript
- **Express.js** web framework
- **PostgreSQL** database
- **Knex.js** query builder
- **JWT** authentication
- **Joi** validation
- **Winston** logging
- **Jest** testing
- **Swagger** documentation

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 15+
- Docker (optional)

### Installation

1. Navigate to backend directory:
   ```bash
   cd packages/task1/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup environment:
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your database credentials.

4. Run migrations:
   ```bash
   npm run migrate
   ```

5. Start development server:
   ```bash
   npm run dev
   ```

### Using Docker

```bash
docker-compose up -d
```

This starts:
- PostgreSQL on port 5432
- Backend API on port 5000
- pgweb (DB viewer) on port 8080

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Notes (Protected)
- `GET /api/notes` - Get all user notes
- `POST /api/notes` - Create new note
- `GET /api/notes/:id` - Get note by ID
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

### Documentation
- `GET /api-docs` - Swagger UI
- `GET /health` - Health check

## Project Structure

```
src/
├── controllers/         # Route handlers
│   ├── AuthController.ts
│   └── NoteController.ts
├── middleware/          # Custom middleware
│   ├── auth.ts         # JWT authentication
│   ├── errorHandler.ts # Error handling
│   └── validation.ts   # Input validation
├── models/             # Data models
│   ├── User.ts
│   └── Note.ts
├── routes/             # Route definitions
│   ├── auth.ts
│   └── notes.ts
├── services/           # Business logic
│   ├── UserService.ts
│   └── NoteService.ts
├── utils/              # Utilities
│   ├── database.ts     # DB connection
│   └── logger.ts       # Winston logger
├── app.ts              # Express app setup
└── server.ts           # Server entry point
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Notes Table
```sql
CREATE TABLE notes (
  id UUID PRIMARY KEY,
  title VARCHAR NOT NULL,
  content TEXT NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. Register/Login to get a JWT token
2. Include token in Authorization header: `Bearer <token>`
3. Protected routes validate the token

## Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Test coverage includes:
- Authentication endpoints
- Note CRUD operations
- Service layer functions
- Validation failures

## Environment Variables

```env
NODE_ENV=development
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=notes_app
DB_USER=postgres
DB_PASSWORD=password

# pgweb
PGWEB_PORT=8080
```

## Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run Jest tests
- `npm run migrate` - Run database migrations
- `npm run migrate:rollback` - Rollback migrations

## Database Management

### Migrations
```bash
npm run migrate          # Run all pending migrations
npm run migrate:rollback # Rollback last migration
```

### Database Viewer
Access pgweb at `http://localhost:8080` to browse your database with a web interface.

## API Documentation

Swagger documentation is available at `http://localhost:5000/api-docs` when the server is running.

## Error Handling

The API includes comprehensive error handling:
- Input validation errors (400)
- Authentication errors (401)
- Authorization errors (403)
- Not found errors (404)
- Server errors (500)

All errors are logged using Winston and returned in a consistent JSON format.

## Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **JWT**: Secure authentication
- **Bcrypt**: Password hashing
- **Input Validation**: Joi schema validation
- **SQL Injection Protection**: Knex.js parameterized queries