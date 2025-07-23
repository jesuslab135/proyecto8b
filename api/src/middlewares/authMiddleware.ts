import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header('Authorization');
<<<<<<< HEAD

   if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied' });
  }

  const token = authHeader.split(' ')[1]; // Extrae solo el token puro

=======
  if (!authHeader) {
    res.status(401).json({ error: 'Access denied' });
    return;
  }
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
>>>>>>> b6959c3 (actualizacion)
  try {
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
<<<<<<< HEAD
  const role = req.rol_id;
  if (role !== 1) {
=======
  const role = req.role;
  if (role !== 'admin') {
>>>>>>> b6959c3 (actualizacion)
    res.status(401).json({ error: 'Access denied' });
    return;
  }
  next();
<<<<<<< HEAD
}

export function verifyUni(req: Request, res: Response, next: NextFunction) {
  const role = req.rol_id;
  if (role !== 2) {
    res.status(401).json({ error: 'Access denied' });
    return;
  }
  next();
=======
>>>>>>> b6959c3 (actualizacion)
}