/** @format */

import jwt from 'jsonwebtoken';
import { Token } from '../interfaces/userInterface';

export const generateToken = (payload: Token): string => {
  if (!process.env.SECRET_TOKEN) {
    throw new Error('SECRET_TOKEN is not defined');
  }

  return jwt.sign(
    {
      id: payload._id,
      role: payload.role,
    },
    process.env.SECRET_TOKEN,
    {
      expiresIn: '2h',
    }
  );
};
