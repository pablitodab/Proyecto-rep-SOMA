import { Request, Response } from "express";
import Rutina from "../models/rutina";

export const crearRutina = async (req: Request, res: Response) => {
  try {
    if (!req.userId) throw new Error("Usuario no autenticado");
    
    const rutina = await Rutina.create({
      userId: req.userId,
      ...req.body
    });
    
    res.status(201).json(rutina);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear rutina' });
  }
};

export const obtenerRutinas = async (req: Request, res: Response) => {
  try {
    const rutinas = await Rutina.findAll({
      where: { userId: req.userId }
    });
    res.json(rutinas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener rutinas' });
  }
};
