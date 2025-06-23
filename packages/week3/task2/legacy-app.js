const app = require('./app');
const PORT = 4002;

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`✅ Legacy app running at http://localhost:${PORT}`);
    console.log(`📚 Swagger docs available at http://localhost:${PORT}/api-docs`);
  });
}

module.exports = app;
