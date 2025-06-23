import { UserService } from '../src/services/UserService';
import { NoteService } from '../src/services/NoteService';

describe('UserService', () => {
  describe('create', () => {
    it('should create a new user', async () => {
      const userData = {
        email: 'service@example.com',
        password: 'password123'
      };

      const user = await UserService.create(userData);

      expect(user.id).toBeDefined();
      expect(user.email).toBe(userData.email);
      expect(user.created_at).toBeDefined();
    });

    it('should throw error for duplicate email', async () => {
      const userData = {
        email: 'duplicate@example.com',
        password: 'password123'
      };

      await UserService.create(userData);

      await expect(UserService.create(userData)).rejects.toThrow('User already exists');
    });
  });

  describe('validatePassword', () => {
    it('should return true for correct password', async () => {
      const password = 'testpassword';
      const user = await UserService.create({
        email: 'password@example.com',
        password
      });

      const fullUser = await UserService.findByEmail(user.email);
      const isValid = await UserService.validatePassword(password, fullUser!.password);

      expect(isValid).toBe(true);
    });

    it('should return false for incorrect password', async () => {
      const user = await UserService.create({
        email: 'wrongpass@example.com',
        password: 'correctpassword'
      });

      const fullUser = await UserService.findByEmail(user.email);
      const isValid = await UserService.validatePassword('wrongpassword', fullUser!.password);

      expect(isValid).toBe(false);
    });
  });

  describe('generateToken', () => {
    it('should generate a valid JWT token', () => {
      const userId = 'test-user-id';
      const token = UserService.generateToken(userId);

      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(0);
    });
  });
});

describe('NoteService', () => {
  let userId: string;

  beforeEach(async () => {
    const user = await UserService.create({
      email: 'noteservice@example.com',
      password: 'password123'
    });
    userId = user.id;
  });

  describe('create', () => {
    it('should create a new note', async () => {
      const noteData = {
        title: 'Service Test Note',
        content: 'This is a service test note',
        user_id: userId
      };

      const note = await NoteService.create(noteData);

      expect(note.id).toBeDefined();
      expect(note.title).toBe(noteData.title);
      expect(note.content).toBe(noteData.content);
      expect(note.user_id).toBe(userId);
    });
  });

  describe('findByUserId', () => {
    it('should return notes for specific user', async () => {
      await NoteService.create({
        title: 'User Note 1',
        content: 'Content 1',
        user_id: userId
      });

      await NoteService.create({
        title: 'User Note 2',
        content: 'Content 2',
        user_id: userId
      });

      const notes = await NoteService.findByUserId(userId);

      expect(notes.length).toBe(2);
      expect(notes.every(note => note.user_id === userId)).toBe(true);
    });
  });
});