import { Request, Response } from "express";
import Objetivo from "../models/objetivo";

export const crearObjetivo = async (req: Request, res: Response) => {
  try {
    if (!req.userId) throw new Error("Usuario no autenticado");
    
    const objetivo = await Objetivo.create({
      userId: req.userId,
      ...req.body
    });
    
    res.status(201).json(objetivo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear objetivo' });
  }
};

export const obtenerObjetivos = async (req: Request, res: Response) => {
    try {
	if (!req.userId) throw new Error("Usuario no autenticado");

        const objetivos = await Objetivo.findAll({
            where: { userId: req.userId }
        });
        res.json(objetivos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener objetivos' });
    }
};

export const actualizarObjetivo = async (req: Request, res: Response) => {
    try {
	if (!req.userId) throw new Error("Usuario no autenticado");

        const objetivo = await Objetivo.findByPk(req.params.id);
        if (!objetivo || objetivo.userId !== req.userId) {
            return res.status(404).json({ error: 'Objetivo no encontrado' });
        }
        
        await objetivo.update(req.body);
        res.json(objetivo);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar objetivo' });
    }
};

export const eliminarObjetivo = async (req: Request, res: Response) => {
    try {
	if (!req.userId) throw new Error("Usuario no autenticado");

        const objetivo = await Objetivo.findByPk(req.params.id);
        if (!objetivo || objetivo.userId !== req.userId) {
            return res.status(404).json({ error: 'Objetivo no encontrado' });
        }
        
        await objetivo.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar objetivo' });
    }
};
