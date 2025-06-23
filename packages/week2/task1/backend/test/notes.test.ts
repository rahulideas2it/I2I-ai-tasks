import request from 'supertest';
import app from '../src/app';
import { UserService } from '../src/services/UserService';

describe('Notes Endpoints', () => {
  let authToken: string;
  let userId: string;

  beforeEach(async () => {
    // Create a test user and get auth token
    const user = await UserService.create({
      email: 'notes@example.com',
      password: 'password123'
    });
    userId = user.id;
    authToken = UserService.generateToken(user.id);
  });

  describe('POST /api/notes', () => {
    it('should create a new note with valid data', async () => {
      const noteData = {
        title: 'Test Note',
        content: 'This is a test note content'
      };

      const response = await request(app)
        .post('/api/notes')
        .set('Authorization', `Bearer ${authToken}`)
        .send(noteData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(noteData.title);
      expect(response.body.data.content).toBe(noteData.content);
      expect(response.body.data.user_id).toBe(userId);
    });

    it('should return validation error for missing title', async () => {
      const noteData = {
        content: 'This is a test note content'
      };

      const response = await request(app)
        .post('/api/notes')
        .set('Authorization', `Bearer ${authToken}`)
        .send(noteData)
        .expect(400);

      expect(response.body.message).toBe('Validation error');
    });

    it('should return unauthorized without token', async () => {
      const noteData = {
        title: 'Test Note',
        content: 'This is a test note content'
      };

      const response = await request(app)
        .post('/api/notes')
        .send(noteData)
        .expect(401);

      expect(response.body.message).toBe('Access token required');
    });
  });

  describe('GET /api/notes', () => {
    it('should get all notes for authenticated user', async () => {
      // Create a test note first
      await request(app)
        .post('/api/notes')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Test Note',
          content: 'Test content'
        });

      const response = await request(app)
        .get('/api/notes')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('should return unauthorized without token', async () => {
      const response = await request(app)
        .get('/api/notes')
        .expect(401);

      expect(response.body.message).toBe('Access token required');
    });
  });
});