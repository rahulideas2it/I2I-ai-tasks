export interface Note {
  id: string;
  title: string;
  content: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateNoteData {
  title: string;
  content: string;
  user_id: string;
}

export interface UpdateNoteData {
  title?: string;
  content?: string;
}