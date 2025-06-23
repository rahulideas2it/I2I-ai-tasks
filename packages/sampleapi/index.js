const express = require('express');
const serverless = require('serverless-http');

const app = express();

app.get('/', (req, res) => {
  res.json({ 
    message: 'Sample API Working!',
    timestamp: new Date().toISOString(),
    path: req.path
  });
});

module.exports = serverless(app);