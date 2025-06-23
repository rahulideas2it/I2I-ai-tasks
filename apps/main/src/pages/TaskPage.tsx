import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Box, Typography, Button } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'

interface TaskPageProps {
  isEvil: boolean
}

const taskContent: Record<string, { title: string; content: string; github?: string; demo?: string }> = {
  'notes-app': {
    title: '📝 Full-Stack Notes Application',
    github: 'https://github.com/your-repo/notes-app',
    demo: 'http://localhost:3001',
    content: `A complete note-taking application with React frontend, Express backend, JWT authentication, and SQLite database.

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

### Core Structure
src/
├── server.ts          # Entry point - starts Express server
├── app.ts             # Express app setup with middleware
├── controllers/       # Route handlers (business logic)
├── routes/           # API endpoints definition
├── services/         # Database operations
├── middleware/       # Custom middleware (auth, validation)
├── models/           # TypeScript interfaces
└── utils/            # Database, logging, swagger setup

### Key Configuration Files

**Environment (.env):**
PORT=4001                    # Server port
JWT_SECRET=your-secret       # JWT signing key
DB_CLIENT=sqlite3           # Database type
DB_FILENAME=./dev.sqlite3   # SQLite file location

**Database (knexfile.js):**
- Uses SQLite for development
- Migrations in /migrations folder
- Connection via Knex.js ORM

**Authentication:**
- JWT tokens for user auth
- bcrypt for password hashing
- Protected routes via middleware

**API Structure:**
- /api/auth/* - Login/signup
- /api/notes/* - CRUD operations
- /api-docs - Swagger documentation`
  },
  'legacy-modern': {
    title: '🏗️ Legacy vs Modern Express App',
    github: 'https://github.com/your-repo/legacy-modern',
    demo: 'http://localhost:4002',
    content: `This project demonstrates a legacy Node.js Express backend and its refactored modern version side by side.

📁 Project Structure
.
├── legacy-app/        # Old-school monolith (JavaScript)
├── modern-app/        # Refactored app (TypeScript, modular, secure)
└── README.md          # This file

📜 Legacy App
Location: legacy-app/

❌ Known Problems:
- Uses var and non-modular code
- Weak password hashing (md5)
- Poor security (e.g., XSS, no input validation)
- Synchronous file access (bad performance)
- No unit tests
- All logic in one file

🚀 Modern App
Location: modern-app/

A secure, testable, and maintainable Express backend written in TypeScript. It follows:
- ✅ SOLID principles
- ✅ Secure password hashing (bcrypt)
- ✅ JWT-based auth
- ✅ Centralized error handling
- ✅ Input validation (express-validator)
- ✅ Unit tests with Jest`
  },
  'java-swift': {
    title: '📸 Screenshot Listener — Java to Swift Conversion',
    content: `This project demonstrates a platform migration of a screenshot detection listener from Android (Java) to iOS (Swift) using an AI-driven development workflow.

🧠 Objective
Convert a screenshot listener from Java (Android) to Swift (iOS) using AI assistance, while ensuring:
- ✅ Logic parity
- ✅ Idiomatic Swift syntax
- ✅ Robust error handling
- ✅ Performance and memory safety

⚙️ Conversion Strategy
"AI Driven Development"

🔁 Before/After Summary
| Aspect              | Java (Android)                      | Swift (iOS)                               |
|---------------------|--------------------------------------|-------------------------------------------|
| Screenshot Trigger  | ContentObserver on MediaStore       | NotificationCenter via UIApplication     |
| Thread Handling     | Handler/Looper                       | Main thread via closure                   |
| Resource Cleanup    | Unregister observer                  | Remove observer in deinit or manually    |
| Error Handling      | Try/catch, null checks               | guard, optional, fatalError checks       |
| Language Patterns   | OOP-heavy                            | Structs, lightweight closures            |

✅ Result
The screenshot listener logic was fully migrated from Java to Swift using AI-assisted translation. Manual testing confirms correct observer behavior on iOS, with no memory leaks or crashes.`
  },
  'shopping-cart': {
    title: '🛒 TDD Shopping Cart Application',
    github: 'https://github.com/your-repo/shopping-cart',
    demo: 'http://localhost:3002',
    content: `A modern Shopping Cart built with React, Vite, TypeScript, and Jest using the Test-Driven Development (TDD) approach.

## Tech Stack
- 🔧 Vite (React + TS)
- ⚛️ React 18
- 🧪 Jest + Testing Library
- ✅ TypeScript
- 🧹 ESLint + Prettier (optional)
- 💡 TDD methodology

## Test Coverage
----------------|---------|----------|---------|---------|-------------------
File            | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------------|---------|----------|---------|---------|-------------------
All files       |     100 |      100 |     100 |     100 |                  
 src            |     100 |      100 |     100 |     100 |                  
  App.tsx       |     100 |      100 |     100 |     100 |                  
 src/components |     100 |      100 |     100 |     100 |                  
  Cart.tsx      |     100 |      100 |     100 |     100 |                  
----------------|---------|----------|---------|---------|-------------------

Test Suites: 2 passed, 2 total
Tests:       9 passed, 9 total

## Features
- 🛒 Add, remove, and update items in the cart
- 📊 Total price calculation
- 🔄 Quantity increase/decrease with minimum enforcement
- 🧪 Fully unit tested (100% coverage)
- ♿ Accessible elements with semantic tags
- ⚙️ Designed with modular and reusable components

## Test Coverage Includes
### Unit Tests
- Cart rendering
- Display of item details
- Quantity adjustment logic
- Total calculation
- Empty cart fallback`
  },
  'security-testing': {
    title: '🔒 Legacy App Security Testing Suite',
    github: 'https://github.com/your-repo/security-testing',
    content: `A comprehensive test suite for a legacy Express.js application demonstrating security vulnerabilities and edge case handling.

## Test Coverage Achieved
- **97.82% Statement Coverage** on main application code
- **92.85% Branch Coverage** covering all conditional logic
- **100% Function Coverage** testing all endpoints
- **36 comprehensive test cases** covering normal and edge scenarios

## Test Categories

### Happy Path Testing
- ✅ User registration and login flows
- ✅ Search functionality with queries
- ✅ Admin access with proper credentials
- ✅ File operations and data persistence

### Edge Case Testing
- ✅ Undefined/null parameter handling
- ✅ Empty request bodies
- ✅ Missing required fields
- ✅ Case sensitivity validation
- ✅ Large payload processing

### Security Vulnerability Testing
- 🚨 **Path Traversal**: Admin endpoint allows arbitrary file access
- 🚨 **Weak Hashing**: MD5 used for password storage
- 🚨 **Input Validation**: No sanitization of user inputs
- 🚨 **Error Exposure**: Stack traces leaked in responses
- 🚨 **No Rate Limiting**: Endpoints vulnerable to brute force

### Error Handling Testing
- ✅ File system permission errors
- ✅ Corrupted data file handling
- ✅ Network and I/O failures
- ✅ Malformed JSON requests
- ✅ Database operation failures

## Key Security Issues Identified

### Critical Vulnerabilities
1. **Directory Traversal** - GET /admin?file=../../../etc/passwd
2. **Weak Cryptography** - MD5 hashing for passwords
3. **No Input Validation** - SQL injection and XSS vectors
4. **Information Disclosure** - Detailed error messages

### Authentication Flaws
- No session management
- No password complexity requirements
- No account lockout mechanisms
- Credentials stored in plain text files

## Test Execution Summary
- **Total Tests**: 36
- **Passing Tests**: 36 (100%)
- **Failed Tests**: 0
- **Test Suites**: 1
- **Execution Time**: ~3.5 seconds
- **Coverage Threshold**: Met for statements, branches, and functions`
  },
  'popup-component': {
    title: '🧩 Admission Toggle Popup Component',
    github: 'https://github.com/your-repo/popup-component',
    content: `A reusable, accessible popup component that allows toggling between multiple admission records in an application context — built entirely with AI-assisted development.

✅ Feature Summary
🎯 Feature: A popup component to toggle between multiple patient admissions, integrated into the current app's UI flow.

📦 Files Included
- /components/admission-popup/
  - admission-popup.component.ts
  - admission-popup.component.html
  - admission-popup.component.scss

📚 Notes
This component was developed using a fully AI-assisted workflow guided by structured prompt engineering. All logic, tests, and styling were generated and reviewed iteratively.

🏁 Result
The component is:
- 🔁 Fully reusable
- 🧪 Testable and validated
- 🧼 Clean and idiomatic
- 💡 Easily extendable for other list-based toggles`
  }
}

export const TaskPage = ({ isEvil }: TaskPageProps) => {
  const { taskId } = useParams<{ taskId: string }>()
  const task = taskContent[taskId || '']

  if (!task) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4">Task not found</Typography>
        <Link to="/">
          <Button startIcon={<ArrowBack />} sx={{ mt: 2 }}>
            Back to Home
          </Button>
        </Link>
      </Container>
    )
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: isEvil 
        ? 'linear-gradient(135deg, #1a1a1a 0%, #2d1b1b 100%)'
        : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      py: 4
    }}>
      <Container maxWidth="md">
        <Link to="/#content" style={{ textDecoration: 'none' }}>
          <Button 
            startIcon={<ArrowBack />} 
            sx={{ 
              mb: 3,
              color: isEvil ? '#e53935' : '#1e88e5',
              '&:hover': {
                backgroundColor: isEvil ? 'rgba(229, 57, 53, 0.1)' : 'rgba(30, 136, 229, 0.1)'
              }
            }}
          >
            Back to Home
          </Button>
        </Link>
        
        <Box sx={{
          backgroundColor: isEvil ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)',
          borderRadius: '16px',
          p: 4,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          <Typography 
            variant="h3" 
            sx={{ 
              mb: 3,
              color: isEvil ? '#e53935' : '#1e88e5',
              fontWeight: '600',
              fontFamily: 'Inter, system-ui, sans-serif'
            }}
          >
            {task.title}
          </Typography>
          
          {(task.github || task.demo) && (
            <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
              {task.github && (
                <Button 
                  variant="outlined" 
                  href={task.github} 
                  target="_blank"
                  sx={{ borderRadius: '8px' }}
                >
                  GitHub
                </Button>
              )}
              {task.demo && (
                <Button 
                  variant="contained" 
                  href={task.demo} 
                  target="_blank"
                  sx={{ borderRadius: '8px' }}
                >
                  Live Demo
                </Button>
              )}
            </Box>
          )}
          
          <Typography 
            variant="body1" 
            sx={{ 
              whiteSpace: 'pre-line',
              lineHeight: 1.8,
              color: isEvil ? '#ffffff' : '#333333',
              fontFamily: 'Inter, system-ui, sans-serif'
            }}
          >
            {task.content}
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}