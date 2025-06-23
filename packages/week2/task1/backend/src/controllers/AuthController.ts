import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import logger from '../utils/logger';

export class AuthController {
  static async signup(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      
      const user = await UserService.create({ email, password });
      const token = UserService.generateToken(user.id);

      logger.info(`New user registered: ${email}`);

      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: {
          token,
          user: {
            id: user.id,
            email: user.email
          }
        }
      });
    } catch (error: any) {
      logger.error('Signup error:', error);
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      
      const user = await UserService.findByEmail(email);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      const isValidPassword = await UserService.validatePassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      const token = UserService.generateToken(user.id);

      logger.info(`User logged in: ${email}`);

      res.json({
        success: true,
        message: 'Login successful',
        data: {
          token,
          user: {
            id: user.id,
            email: user.email
          }
        }
      });
    } catch (error: any) {
      logger.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}