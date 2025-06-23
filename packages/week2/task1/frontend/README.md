# Note Taking App - Frontend

A React TypeScript frontend for a full-stack note-taking application.

## Features

- **Authentication**: Login/Signup with JWT tokens
- **Notes Management**: Create, read, update, delete notes
- **Protected Routes**: Secure access to authenticated pages
- **Responsive Design**: Works on desktop and mobile
- **Error Handling**: User-friendly error and success messages

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **Axios** for API calls
- **Context API** for state management

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- Backend API running on `http://localhost:3001`

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd packages/task1/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your API URL:
   ```
   VITE_API_URL=http://localhost:3001/api
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

5. Open browser at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.tsx      # Navigation header
│   └── ProtectedRoute.tsx # Route protection
├── pages/              # Page components
│   ├── Login.tsx       # Login page
│   ├── Signup.tsx      # Registration page
│   ├── NotesList.tsx   # Notes listing
│   └── NoteEditor.tsx  # Create/edit notes
├── services/           # API services
│   └── api.ts          # Axios configuration
├── context/            # React Context
│   └── AuthContext.tsx # Authentication state
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## API Integration

The app expects a REST API with these endpoints:

- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get single note
- `POST /api/notes` - Create note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

## Authentication

- JWT tokens stored in localStorage
- Automatic token inclusion in API requests
- Protected routes redirect to login if unauthenticated
- Session persists across browser refreshes

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

- `VITE_API_URL` - Backend API base URL (default: http://localhost:3001/api)