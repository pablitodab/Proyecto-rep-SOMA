import { Request, Response } from "express";
import Rutina from "../models/rutina";

export const crearRutina = async (req: Request, res: Response) => {
    const { dia, descripcion, enfoque, cardio } = req.body;

    if (!dia || !descripcion || !enfoque || typeof cardio !== 'boolean') {
        return res.status(400).json({
            success: false,
            msg: "Todos los campos son requeridos"
        });
    }

    try {
        const rutina = await Rutina.create({
            userId: req.userId!,
            dia,
            descripcion,
            enfoque,
            cardio
        });

        res.status(201).json({
            success: true,
            data: rutina
        });

    } catch (error) {
        console.error("Error creando rutina:", error);
        res.status(500).json({
            success: false,
            msg: 'Error al crear rutina'
        });
    }
};

export const obtenerRutinas = async (req: Request, res: Response) => {
    try {
        const rutinas = await Rutina.findAll({
            where: { userId: req.userId },
            order: [['dia', 'ASC']]
        });

        res.json({
            success: true,
            data: rutinas
        });

    } catch (error) {
        console.error("Error obteniendo rutinas:", error);
        res.status(500).json({
            success: false,
            msg: 'Error al obtener rutinas'
        });
    }
};

export const obtenerRutinasUsuario = async (req: Request, res: Response) => {
  try {
    const rutinas = await Rutina.findAll({
      where: { userId: req.params.userId },
      order: [['dia', 'ASC']]
    });
    res.json({
      success: true,
      data: rutinas
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: 'Error al obtener rutinas del usuario'
    });
  }
};
