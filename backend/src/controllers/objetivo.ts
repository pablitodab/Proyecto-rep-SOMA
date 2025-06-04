import { Request, Response } from "express";
import Objetivo from "../models/objetivo";

export const crearObjetivo = async (req: Request, res: Response) => {
    const { nombre, descripcion, fechaFin } = req.body;
    
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
            descripcion: descripcion || '',
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

export const obtenerObjetivosUsuario = async (req: Request, res: Response) => {
    try {
        const objetivos = await Objetivo.findAll({
            where: { userId: parseInt(req.params.userId) },
            order: [['fechaFin', 'ASC']]
        });

        res.json({
            success: true,
            data: objetivos
        });
    } catch (error) {
        console.error("Error obteniendo objetivos del usuario:", error);
        res.status(500).json({
            success: false,
            msg: 'Error al obtener objetivos del usuario'
        });
    }
};

export const actualizarObjetivo = async (req: Request, res: Response) => {
    try {
        const [affectedCount] = await Objetivo.update(req.body, {
            where: {
                id: req.params.id,
                userId: req.userId!
            }
        });

        if (affectedCount === 0) {
            return res.status(404).json({
                success: false,
                msg: 'Objetivo no encontrado'
            });
        }

        res.json({
            success: true,
            msg: 'Objetivo actualizado'
        });
    } catch (error) {
        console.error("Error actualizando objetivo:", error);
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar objetivo'
        });
    }
};

export const eliminarObjetivo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        const count = await Objetivo.destroy({
            where: {
                id: parseInt(id),
                userId: req.userId!
            }
        });

        if (count === 0) {
            return res.status(404).json({
                success: false,
                msg: 'Objetivo no encontrado o no tienes permisos'
            });
        }

        res.json({
            success: true,
            msg: 'Objetivo eliminado correctamente'
        });
    } catch (error) {
        console.error("Error eliminando objetivo:", error);
        res.status(500).json({
            success: false,
            msg: 'Error interno del servidor'
        });
    }
};

export const toggleCumplido = async (req: Request, res: Response) => {
    try {
        const objetivo = await Objetivo.findOne({
            where: {
                id: req.params.id,
                userId: req.userId!
            }
        });

        if (!objetivo) {
            return res.status(404).json({
                success: false,
                msg: 'Objetivo no encontrado'
            });
        }

        await objetivo.update({ cumplido: !objetivo.cumplido });

        res.json({
            success: true,
            data: objetivo
        });
    } catch (error) {
        console.error("Error cambiando estado de objetivo:", error);
        res.status(500).json({
            success: false,
            msg: 'Error al cambiar estado del objetivo'
        });
    }
};
