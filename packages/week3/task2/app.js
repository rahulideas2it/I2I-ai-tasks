const express = require('express');
const fs = require('fs');
const md5 = require('md5');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

// Load user data
let users = [];
if (fs.existsSync('users.txt')) {
  users = JSON.parse(fs.readFileSync('users.txt', 'utf-8'));
}

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Swagger setup
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Legacy App API',
      version: '1.0.0',
      description: 'API documentation for the legacy Express app'
    }
  },
  apis: ['./app.js']
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const userExists = users.find(u => u.username === username);
  if (userExists) return res.status(400).send('User exists');

  const hashed = md5(password);
  users.push({ username, password: hashed });
  fs.writeFileSync('users.txt', JSON.stringify(users));
  res.send('Registered');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const hashed = md5(password);
  const user = users.find(u => u.username === username && u.password === hashed);
  if (!user) return res.status(401).send('Invalid credentials');
  res.send('Login successful');
});

app.get('/search', (req, res) => {
  const query = req.query.q || '';
  const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
  const results = data.filter(item => item.title.includes(query));
  res.json(results);
});

app.get('/admin', (req, res) => {
  const user = req.query.user;
  if (user === 'admin') {
    const file = req.query.file || 'users.txt';
    const content = fs.readFileSync(file, 'utf-8');
    res.send(content);
  } else {
    res.status(403).send('Access denied');
  }
});

module.exports = app;