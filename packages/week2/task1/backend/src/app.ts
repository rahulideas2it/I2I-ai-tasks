import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import authRoutes from './routes/auth';
import noteRoutes from './routes/notes';
import { errorHandler, notFound } from './middleware/errorHandler';
import { setupSwagger } from './utils/swagger';
import logger from './utils/logger';

dotenv.config();

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Logging middleware
app.use(morgan('combined', {
  stream: { write: (message) => logger.info(message.trim()) }
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// Swagger documentation
setupSwagger(app);

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;