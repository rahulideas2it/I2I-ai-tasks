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
      'GET /modernApi - This endpoint',
      'GET /modernApi/health - Health check',
      'POST /modernApi/users - Create user (demo)',
      'GET /modernApi/users - List users (demo)'
    ]
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.get('/users', (req, res) => {
  res.json([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ]);
});

app.post('/users', (req, res) => {
  const { name, email } = req.body;
  res.json({ 
    id: Date.now(), 
    name: name || 'Demo User', 
    email: email || 'demo@example.com',
    created: new Date().toISOString()
  });
});

module.exports = app;