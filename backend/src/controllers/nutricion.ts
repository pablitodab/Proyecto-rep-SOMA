import { Request, Response } from "express";
import Nutricion from "../models/nutricion";

export const crearRegistro = async (req: Request, res: Response) => {
  try {
    if (!req.userId) throw new Error("Usuario no autenticado");
    
    const registro = await Nutricion.create({
      userId: req.userId,
      ...req.body
    });
    
    res.status(201).json(registro);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear registro nutricional' });
  }
};

export const obtenerRegistros = async (req: Request, res: Response) => {
  try {
    const registros = await Nutricion.findAll({
      where: { userId: req.userId },
      order: [['fecha', 'DESC']]
    });
    res.json(registros);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener registros' });
  }
};

export const actualizarRegistro = async (req: Request, res: Response) => {
  try {
    const registro = await Nutricion.findByPk(req.params.id);
    if (!registro || registro.userId !== req.userId) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }
    
    await registro.update(req.body);
    res.json(registro);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar registro' });
  }
};

export const eliminarRegistro = async (req: Request, res: Response) => {
  try {
    const registro = await Nutricion.findByPk(req.params.id);
    if (!registro || registro.userId !== req.userId) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }
    
    await registro.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar registro' });
  }
};
