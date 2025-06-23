export interface User {
  id: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserData {
  email: string;
  password: string;
}

export interface UserResponse {
  id: string;
  email: string;
  created_at: Date;
}