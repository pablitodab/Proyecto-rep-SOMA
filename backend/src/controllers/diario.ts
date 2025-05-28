import { Request, Response } from "express";
import Diario from "../models/diario";

export const crearEntrada = async (req: Request, res: Response) => {
  try {
    if (!req.userId) throw new Error("Usuario no autenticado");
    
    const entrada = await Diario.create({
      userId: req.userId,
      ...req.body
    });
    
    res.status(201).json(entrada);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear entrada' });
  }
};

export const obtenerEntradas = async (req: Request, res: Response) => {
  try {
    const entradas = await Diario.findAll({
      where: { userId: req.userId }
    });
    res.json(entradas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener entradas' });
  }
};
