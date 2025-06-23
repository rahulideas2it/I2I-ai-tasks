import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// Root route: Show modernization benefits
app.get('/', (req, res) => {
  res.json({
    message: "🚀 Welcome to the Modern Note App!",
    improvements: [
      "✅ Modern TypeScript features",
      "🛡️ Strong input validation & error handling",
      "🔐 Secure authentication (no plain MD5)",
      "🧱 Layered architecture (Controller, Service)",
      "📦 Dependency management & proper typing",
      "📚 Swagger/OpenAPI integrated",
      "🧪 Unit testing friendly structure",
      "♻️ Reusable and maintainable code",
      "💡 Follows SOLID principles",
      "⚙️ Configured for Docker and PostgreSQL",
      "📁 Organized monorepo structure"
    ],
    legacyNote: "📜 Legacy version had outdated JS, poor security, no layers or typing 😢"
  });
});

export default app;
