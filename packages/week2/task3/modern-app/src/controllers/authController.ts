import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { getUserByUsername, saveUser } from '../services/userService';

export const register = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { username, password } = req.body;
  const existing = await getUserByUsername(username);
  if (existing) return res.status(409).json({ message: 'User exists' });

  const hashed = await bcrypt.hash(password, 10);
  const user = await saveUser({ username, password: hashed });
  res.status(201).json({ user });
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await getUserByUsername(username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  res.json({ token });
};
