import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import db from '../utils/database';
import { User, CreateUserData, UserResponse } from '../models/User';

export class UserService {
  static async create(userData: CreateUserData): Promise<UserResponse> {
    const existingUser = await db('users').where({ email: userData.email }).first();
    
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 12);
    const userId = uuidv4();

    const [user] = await db('users')
      .insert({
        id: userId,
        email: userData.email,
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date()
      })
      .returning(['id', 'email', 'created_at']);

    return user;
  }

  static async findByEmail(email: string): Promise<User | null> {
    const user = await db('users').where({ email }).first();
    return user || null;
  }

  static async findById(id: string): Promise<UserResponse | null> {
    const user = await db('users')
      .select(['id', 'email', 'created_at'])
      .where({ id })
      .first();
    return user || null;
  }

  static async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  static generateToken(userId: string): string {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET || 'fallback-secret'
    );
  }
}