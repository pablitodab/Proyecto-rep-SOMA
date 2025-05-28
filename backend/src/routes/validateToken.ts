import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
    userId: number;
    email: string;
}

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ msg: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY || 'Pablo-de-Abajo-TKN') as JwtPayload;
        req.userId = decoded.userId; // Ahora funciona
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token inválido' });
    }
};

export default validateToken;
