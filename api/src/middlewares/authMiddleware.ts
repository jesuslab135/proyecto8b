import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header('Authorization');

   if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied' });
  }

  const token = authHeader.split(' ')[1]; // Extrae solo el token puro

  try {
    // decode jwt toke data
    const decoded = jwt.verify(token, 'your-secret');
    if (typeof decoded !== 'object' || !decoded?.userId) {
      res.status(401).json({ error: 'Access denied' });
      return;
    }
    req.userId = decoded.userId;
    req.rol_id = decoded.rol_id;
    next();
  } catch (e) {
    res.status(401).json({ error: 'Access denied' });
  }
}

export function verifyAdmin(req: Request, res: Response, next: NextFunction) {
  const role = req.rol_id;
  if (role !== 1) {
    res.status(401).json({ error: 'Access denied' });
    return;
  }
  next();
}

export function verifyUni(req: Request, res: Response, next: NextFunction) {
  const role = req.rol_id;
  if (role !== 2) {
    res.status(401).json({ error: 'Access denied' });
    return;
  }
  next();
}