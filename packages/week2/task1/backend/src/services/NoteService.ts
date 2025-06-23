import { v4 as uuidv4 } from 'uuid';
import db from '../utils/database';
import { Note, CreateNoteData, UpdateNoteData } from '../models/Note';

export class NoteService {
  static async create(noteData: CreateNoteData): Promise<Note> {
    const noteId = uuidv4();

    const [note] = await db('notes')
      .insert({
        id: noteId,
        title: noteData.title,
        content: noteData.content,
        user_id: noteData.user_id,
        created_at: new Date(),
        updated_at: new Date()
      })
      .returning('*');

    return note;
  }

  static async findByUserId(userId: string): Promise<Note[]> {
    return db('notes')
      .where({ user_id: userId })
      .orderBy('updated_at', 'desc');
  }

  static async findById(id: string, userId: string): Promise<Note | null> {
    const note = await db('notes')
      .where({ id, user_id: userId })
      .first();
    return note || null;
  }

  static async update(id: string, userId: string, updateData: UpdateNoteData): Promise<Note | null> {
    const [note] = await db('notes')
      .where({ id, user_id: userId })
      .update({
        ...updateData,
        updated_at: new Date()
      })
      .returning('*');

    return note || null;
  }

  static async delete(id: string, userId: string): Promise<boolean> {
    const deletedRows = await db('notes')
      .where({ id, user_id: userId })
      .del();

    return deletedRows > 0;
  }
}