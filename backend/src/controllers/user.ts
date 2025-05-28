import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { Op } from '@sequelize/core';
import jwt from "jsonwebtoken";

import User from "../models/user";

export const register = async (req: Request, res: Response) => {
    const { name, lastname, password, email, credential } = req.body;

    const user = await User.findOne({where: {[Op.or]: [{ email: email }, { credential: credential }]}});

    if (user) {
        return res.status(400).json({
            msg: `Usuario ya existe`
        });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    try {
        await User.create({
            name: name,
            lastname: lastname,
            email: email,
            password: passwordHash,
            credential: credential,
            status: 1,
        });

        res.json({
            msg: `User ${name} ${lastname} created successfully`
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        res.status(500).json({ msg: 'Error al crear el usuario', error: errorMessage });
    }
};

export const login = async (req: Request, res: Response) => {
    const { password, email } = req.body;
    
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
        return res.status(400).json({
            msg: `Usuario no existe`
        });
    }

    try {
        const passwordValid = await bcrypt.compare(password, user.password);
        
        if (!passwordValid) {
            return res.status(400).json({
                msg: `Contraseña incorrecta`
            });
        }

        const token = jwt.sign(
            { 
                email: email,
                userId: user.id // Añadir ID al token
            }, 
            process.env.SECRET_KEY || 'Pablo-de-Abajo-TKN', 
            { expiresIn: '1h' }
        );
        
        res.json({ token });
    } catch (error) {
        console.error("Error en verificación:", error);
        res.status(500).json({
            msg: `Error interno de autenticación`
        });
    }
};
