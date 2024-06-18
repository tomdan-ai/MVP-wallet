import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';

const userService = new UserService();

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const user = await userService.findByToken(token);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    (req as any).user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
