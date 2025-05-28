import { Request, Response } from "express";
import { Routine } from "../models/routine";

// Obtener todas las rutinas de un usuario
export const getUserRoutines = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const routines = await Routine.findAll({
            where: { user_id: userId },
            order: [['day', 'ASC']]
        });
        
        res.json(routines);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al obtener rutinas',
            error: (error as Error).message
        });
    }
};

// Crear una rutina
export const createRoutine = async (req: Request, res: Response) => {
    try {
        const { user_id, day, description } = req.body;
        const routine = await Routine.create({ user_id, day, description });
        
        res.status(201).json({
            msg: 'Rutina creada correctamente',
            data: routine
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al crear rutina',
            error: (error as Error).message
        });
    }
};

// Actualizar una rutina
export const updateRoutine = async (req: Request, res: Response) => {
    try {
        const routineId = req.params.id;
        const { day, description } = req.body;
        
        const routine = await Routine.findByPk(routineId);
        if (!routine) {
            return res.status(404).json({ msg: 'Rutina no encontrada' });
        }
        
        await routine.update({ day, description });
        
        res.json({
            msg: 'Rutina actualizada correctamente',
            data: routine
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al actualizar rutina',
            error: (error as Error).message
        });
    }
};

// Eliminar una rutina
export const deleteRoutine = async (req: Request, res: Response) => {
    try {
        const routineId = req.params.id;
        
        const routine = await Routine.findByPk(routineId);
        if (!routine) {
            return res.status(404).json({ msg: 'Rutina no encontrada' });
        }
        
        await routine.destroy();
        
        res.json({ msg: 'Rutina eliminada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al eliminar rutina',
            error: (error as Error).message
        });
    }
};
