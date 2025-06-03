import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { Op } from '@sequelize/core';
import jwt from "jsonwebtoken";
import User from "../models/user";

export const register = async (req: Request, res: Response) => {
    const { name, lastname, password, email, credential } = req.body;

    // Validación de campos requeridos
    if (!name || !lastname || !password || !email || !credential) {
        return res.status(400).json({ 
            success: false,
            msg: "Todos los campos son obligatorios" 
        });
    }

    try {
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { email: email },
                    { credential: credential }
                ]
            }
        });

        if (user) {
            return res.status(409).json({
                success: false,
                msg: "El email o credencial ya están registrados"
            });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        await User.create({
            name,
            lastname,
            email,
            password: passwordHash,
            credential,
            status: 1,
        });

	console.log(`✅ Nuevo usuario registrado: ${email}`)
	res.status(201).json({
	    success: true,
	    msg: `Usuario ${name} ${lastname} creado exitosamente`
	});

    } catch (error) {
        console.error("Error en registro:", error);
        res.status(500).json({
            success: false,
            msg: 'Error interno del servidor',
	    
        });
    }
};

export const login = async (req: Request, res: Response) => {
    const { password, email } = req.body;

    if (!password || !email) {
        return res.status(400).json({
            success: false,
            msg: "Email y contraseña son requeridos"
        });
    }

    try {
        const user = await User.findOne({ 
            where: { email: email },
            attributes: ['id', 'name', 'lastname', 'password', 'email'] 
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "Usuario no encontrado"
            });
        }

        const passwordValid = await bcrypt.compare(password, user.password);
        
        if (!passwordValid) {
            return res.status(401).json({
                success: false,
                msg: "Credenciales inválidas"
            });
        }

        const token = jwt.sign(
            {
                userId: user.id,
                name: user.name,
                lastname: user.lastname,
                email: user.email
            },
            process.env.SECRET_KEY || 'Pablo-de-Abajo-TKN',
            { expiresIn: '1h' });
	    console.log(`🔑 Usuario logueado: ${user.email}`);
        
        res.json({
            success: true,
            token,
            user: {
                id: user.id,
                name: user.name,
                lastname: user.lastname,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({
            success: false,
            msg: 'Error interno de autenticación'
        });
    }
};
