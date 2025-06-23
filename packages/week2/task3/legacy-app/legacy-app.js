const express = require('express');
const fs = require('fs');
const md5 = require('md5');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const app = express();
const PORT = 4002;

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
  apis: ['./legacy-app.js'] // Use this file for annotations
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 */
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const userExists = users.find(u => u.username === username);
  if (userExists) return res.status(400).send('User exists');

  const hashed = md5(password);
  users.push({ username, password: hashed });
  fs.writeFileSync('users.txt', JSON.stringify(users));
  res.send('Registered');
});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login with username and password
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Invalid credentials
 */
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const hashed = md5(password);
  const user = users.find(u => u.username === username && u.password === hashed);
  if (!user) return res.status(401).send('Invalid credentials');
  res.send('Login successful');
});

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search articles by title
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Matching results
 */
app.get('/search', (req, res) => {
  const query = req.query.q || '';
  const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
  const results = data.filter(item => item.title.includes(query));
  res.json(results);
});

/**
 * @swagger
 * /admin:
 *   get:
 *     summary: Insecure file viewer (admin only)
 *     parameters:
 *       - in: query
 *         name: user
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: file
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: File content
 *       403:
 *         description: Access denied
 */
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

// Start server
app.listen(PORT, () => {
  console.log(`✅ Legacy app running at http://localhost:${PORT}`);
  console.log(`📚 Swagger docs available at http://localhost:${PORT}/api-docs`);
});
