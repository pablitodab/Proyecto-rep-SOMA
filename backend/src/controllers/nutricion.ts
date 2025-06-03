import { Request, Response } from "express";
import Nutricion from "../models/nutricion";

export const crearRegistro = async (req: Request, res: Response) => {
    const { fecha, calorias_ingeridas, calorias_gastadas, km_caminados } = req.body;

    if (!fecha || !calorias_ingeridas || !calorias_gastadas || !km_caminados) {
        return res.status(400).json({
            success: false,
            msg: "Campos obligatorios faltantes"
        });
    }

    try {
        const registro = await Nutricion.create({
            userId: req.userId!,
            ...req.body
        });

        res.status(201).json({
            success: true,
            data: registro
        });

    } catch (error) {
        console.error("Error creando registro nutricional:", error);
        res.status(500).json({
            success: false,
            msg: 'Error al crear registro'
        });
    }
};

export const obtenerRegistros = async (req: Request, res: Response) => {
    try {
        const registros = await Nutricion.findAll({
            where: { userId: req.userId },
            order: [['fecha', 'DESC']]
        });

        res.json({
            success: true,
            data: registros
        });

    } catch (error) {
        console.error("Error obteniendo registros:", error);
        res.status(500).json({
            success: false,
            msg: 'Error al obtener registros'
        });
    }
};
