const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Simple API routes for demo
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

module.exports = app;