import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { NoteService } from '../services/NoteService';
import logger from '../utils/logger';

export class NoteController {
  static async create(req: AuthRequest, res: Response) {
    try {
      const { title, content } = req.body;
      const userId = req.user!.id;

      const note = await NoteService.create({
        title,
        content,
        user_id: userId
      });

      logger.info(`Note created by user ${userId}: ${note.id}`);

      res.status(201).json({
        success: true,
        message: 'Note created successfully',
        data: note
      });
    } catch (error: any) {
      logger.error('Create note error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async getAll(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const notes = await NoteService.findByUserId(userId);

      res.json({
        success: true,
        data: notes
      });
    } catch (error: any) {
      logger.error('Get notes error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async getById(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user!.id;

      const note = await NoteService.findById(id, userId);
      if (!note) {
        return res.status(404).json({
          success: false,
          message: 'Note not found'
        });
      }

      res.json({
        success: true,
        data: note
      });
    } catch (error: any) {
      logger.error('Get note error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async update(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      const userId = req.user!.id;

      const note = await NoteService.update(id, userId, { title, content });
      if (!note) {
        return res.status(404).json({
          success: false,
          message: 'Note not found'
        });
      }

      logger.info(`Note updated by user ${userId}: ${id}`);

      res.json({
        success: true,
        message: 'Note updated successfully',
        data: note
      });
    } catch (error: any) {
      logger.error('Update note error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async delete(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user!.id;

      const deleted = await NoteService.delete(id, userId);
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Note not found'
        });
      }

      logger.info(`Note deleted by user ${userId}: ${id}`);

      res.json({
        success: true,
        message: 'Note deleted successfully'
      });
    } catch (error: any) {
      logger.error('Delete note error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}