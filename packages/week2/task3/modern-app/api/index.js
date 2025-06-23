const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Simple API routes for demo
app.get('/', (req, res) => {
  res.json({ 
    message: 'Legacy vs Modern Express API Demo',
    status: 'running',
    endpoints: [
      'GET /api - This endpoint',
      'GET /api/health - Health check',
      'POST /api/users - Create user (demo)',
      'GET /api/users - List users (demo)'
    ]
  });
});

app.get('/api', (req, res) => {
  res.json({ 
    message: 'Legacy vs Modern Express API Demo',
    status: 'running',
    endpoints: [
      'GET /api - This endpoint',
      'GET /api/health - Health check',
      'POST /api/users - Create user (demo)',
      'GET /api/users - List users (demo)'
    ]
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ]);
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  res.json({ 
    id: Date.now(), 
    name: name || 'Demo User', 
    email: email || 'demo@example.com',
    created: new Date().toISOString()
  });
});

// Auth routes for notes app
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    res.json({ 
      token: 'demo-jwt-token-' + Date.now(),
      user: { id: 1, email, name: 'Demo User' }
    });
  } else {
    res.status(400).json({ error: 'Email and password required' });
  }
});

app.post('/api/auth/register', (req, res) => {
  const { email, password, name } = req.body;
  if (email && password) {
    res.json({ 
      token: 'demo-jwt-token-' + Date.now(),
      user: { id: Date.now(), email, name: name || 'New User' }
    });
  } else {
    res.status(400).json({ error: 'Email and password required' });
  }
});

// Notes routes
app.get('/api/notes', (req, res) => {
  res.json([
    { id: 1, title: 'Demo Note 1', content: 'This is a demo note', createdAt: new Date().toISOString() },
    { id: 2, title: 'Demo Note 2', content: 'Another demo note', createdAt: new Date().toISOString() }
  ]);
});

app.post('/api/notes', (req, res) => {
  const { title, content } = req.body;
  res.json({ 
    id: Date.now(), 
    title: title || 'New Note',
    content: content || 'Note content',
    createdAt: new Date().toISOString()
  });
});

module.exports = app;