import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        details: error.details.map(detail => detail.message)
      });
    }
    
    next();
  };
};

export const authSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

export const noteSchema = Joi.object({
  title: Joi.string().required().max(255),
  content: Joi.string().required()
});

export const updateNoteSchema = Joi.object({
  title: Joi.string().max(255),
  content: Joi.string()
}).min(1);