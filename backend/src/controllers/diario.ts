import { Request, Response } from "express";
import Diario from "../models/diario";

export const crearEntrada = async (req: Request, res: Response) => {
  try {
    const entrada = await Diario.create({
      userId: req.userId!,
      ...req.body
    });
    res.status(201).json({ 
      success: true, 
      data: entrada 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      msg: 'Error al crear entrada' 
    });
  }
};

export const obtenerEntradasUsuario = async (req: Request, res: Response) => {
  try {
    const entradas = await Diario.findAll({
      where: { userId: req.params.userId },
      order: [['fecha', 'DESC']]
    });
    res.json({ 
      success: true, 
      data: entradas 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      msg: 'Error al obtener entradas' 
    });
  }
};

// ✅ AÑADIR ESTOS MÉTODOS
export const actualizarEntrada = async (req: Request, res: Response) => {
  try {
    const [affectedCount] = await Diario.update(req.body, {
      where: { 
        id: req.params.id,
        userId: req.userId!
      }
    });

    if (affectedCount === 0) {
      return res.status(404).json({ 
        success: false, 
        msg: 'Entrada no encontrada' 
      });
    }

    res.json({ 
      success: true, 
      msg: 'Entrada actualizada' 
    });
  } catch (error) {
    console.error("Error actualizando entrada:", error);
    res.status(500).json({ 
      success: false, 
      msg: 'Error al actualizar entrada' 
    });
  }
};

export const eliminarEntrada = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    console.log('Eliminando entrada ID:', id, 'Usuario:', req.userId); // Debug
    
    const count = await Diario.destroy({
      where: { 
        id: parseInt(id),
        userId: req.userId!
      }
    });

    if (count === 0) {
      return res.status(404).json({ 
        success: false, 
        msg: 'Entrada no encontrada o no tienes permisos' 
      });
    }

    res.json({ 
      success: true, 
      msg: 'Entrada eliminada correctamente' 
    });
  } catch (error) {
    console.error("Error eliminando entrada:", error);
    res.status(500).json({ 
      success: false, 
      msg: 'Error interno del servidor' 
    });
  }
};
