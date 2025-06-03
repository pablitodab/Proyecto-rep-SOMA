import { Request, Response } from "express";
import Objetivo from "../models/objetivo";

export const crearObjetivo = async (req: Request, res: Response) => {
    const { nombre, fechaFin } = req.body;

    if (!nombre || !fechaFin) {
        return res.status(400).json({
            success: false,
            msg: "Nombre y fecha de fin son requeridos"
        });
    }

    try {
        const objetivo = await Objetivo.create({
            userId: req.userId!,
            nombre,
            fechaFin,
            importancia: req.body.importancia || 'media',
            cumplido: false
        });

        res.status(201).json({
            success: true,
            data: objetivo
        });

    } catch (error) {
        console.error("Error creando objetivo:", error);
        res.status(500).json({
            success: false,
            msg: 'Error al crear objetivo'
        });
    }
};

export const obtenerObjetivos = async (req: Request, res: Response) => {
    try {
        const objetivos = await Objetivo.findAll({
            where: { userId: req.userId },
            order: [['fechaFin', 'ASC']]
        });

        res.json({
            success: true,
            data: objetivos
        });

    } catch (error) {
        console.error("Error obteniendo objetivos:", error);
        res.status(500).json({
            success: false,
            msg: 'Error al obtener objetivos'
        });
    }
};
