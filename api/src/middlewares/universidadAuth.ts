import { Request, Response, NextFunction } from 'express';

export function universidadAuth(req: Request, res: Response, next: NextFunction) {
  // Aquí podrías hacer una validación de token de sesión o JWT en header
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado' });
  }

  // Aquí solo dejamos pasar por simplicidad (pero puedes validar más)
  next();
}
