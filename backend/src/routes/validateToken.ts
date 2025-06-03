import { NextFunction, Request, Response, Router } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: number;
  email: string;
  name: string;
  lastname: string;
}

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, msg: 'Acceso no autorizado' });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ success: false, msg: 'Token inválido' });
  }
};
export default validateToken;
