# Task 1: Full-Stack Note-Taking App

A complete note-taking application with React frontend and Express.js backend.

## Architecture

```
task1/
├── frontend/           # React TypeScript frontend
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Page components
│   │   ├── services/   # API services
│   │   └── context/    # React Context
│   └── package.json
├── backend/            # Express.js TypeScript backend
│   ├── src/
│   │   ├── controllers/# Route handlers
│   │   ├── middleware/ # Custom middleware
│   │   ├── routes/     # API routes
│   │   ├── services/   # Business logic
│   │   └── models/     # Data models
│   ├── test/           # Jest tests
│   └── package.json
└── README.md
```

## Features

### Frontend
- **React 18** with TypeScript
- **React Router** for navigation
- **Context API** for state management
- **Axios** for API calls
- **JWT Authentication** with localStorage
- **Responsive Design** with CSS

### Backend
- **Express.js** with TypeScript
- **SQLite** with Knex.js
- **JWT Authentication** with bcrypt
- **Joi Validation** for input validation
- **Winston + Morgan** logging
- **Swagger Documentation**
- **Jest Testing**

## Backend Configuration

### **Core Structure**
```
src/
├── server.ts          # Entry point - starts Express server
├── app.ts             # Express app setup with middleware
├── controllers/       # Route handlers (business logic)
├── routes/           # API endpoints definition
├── services/         # Database operations
├── middleware/       # Custom middleware (auth, validation)
├── models/           # TypeScript interfaces
└── utils/            # Database, logging, swagger setup
```

### **Key Configuration Files**

**Environment (`.env`):**
```env
PORT=4000                    # Server port
JWT_SECRET=your-secret       # JWT signing key
DB_CLIENT=sqlite3           # Database type
DB_FILENAME=./dev.sqlite3   # SQLite file location
```

**Database (`knexfile.js`):**
- Uses SQLite for development
- Migrations in `/migrations` folder
- Connection via Knex.js ORM

**Authentication:**
- JWT tokens for user auth
- bcrypt for password hashing
- Protected routes via middleware

**API Structure:**
- `/api/auth/*` - Login/signup
- `/api/notes/*` - CRUD operations
- `/api-docs` - Swagger documentation

**Key Dependencies:**
- **Express.js** - Web framework
- **Knex.js** - Database ORM
- **SQLite3** - Database
- **JWT** - Authentication
- **Swagger** - API docs

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- Docker (optional)

### Backend Setup

1. Navigate to backend:
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

4. Run migrations:
   ```bash
   npm run migrate
   ```

5. Start backend:
   ```bash
   npm run dev
   ```

Backend runs on `http://localhost:4000`

### Frontend Setup

1. Navigate to frontend:
   ```bash
   cd packages/task1/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start frontend:
   ```bash
   npm run dev
   ```

Frontend runs on `http://localhost:5173`

### Database

Uses SQLite for development (no setup required).
Database file: `backend/dev.sqlite3`

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

## Frontend Pages

- `/login` - User login
- `/signup` - User registration
- `/` - Notes list (protected)
- `/notes/new` - Create note (protected)
- `/notes/:id` - Edit note (protected)

## Testing

### Backend Tests
```bash
cd packages/task1/backend
npm test
```

### Frontend Tests
```bash
cd packages/task1/frontend
npm test
```

## Documentation

- **API Docs**: `http://localhost:4000/api-docs` (Swagger)
- **Database Viewer**: `http://localhost:8080` (pgweb with Docker)

## Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=4000
JWT_SECRET=your-secret-key
DB_HOST=localhost
DB_PORT=5432
DB_NAME=notes_app
DB_USER=postgres
DB_PASSWORD=password
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:4000/api
```

## Development Workflow

1. Start backend: `cd backend && npm run dev`
2. Start frontend: `cd frontend && npm run dev`
3. Access app at `http://localhost:5173`
4. View API docs at `http://localhost:4000/api-docs`

## Production Build

### Backend
```bash
cd packages/task1/backend
npm run build
npm start
```

### Frontend
```bash
cd packages/task1/frontend
npm run build
npm run preview
```

## Tech Stack Summary

**Frontend:**
- React 18 + TypeScript
- React Router DOM
- Axios
- Vite

**Backend:**
- Express.js + TypeScript
- PostgreSQL + Knex.js
- JWT + bcrypt
- Joi validation
- Winston logging
- Swagger docs
- Jest testing

**DevOps:**
- Docker + Docker Compose
- pgweb for database viewing
- Environment-based configuration