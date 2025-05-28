import { sequelize } from '../database/connection';
import { DataTypes } from '@sequelize/core';

export const WorkoutExercise = sequelize.define(
    'WorkoutExercise',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        session_id: { 
            type: DataTypes.INTEGER, 
            allowNull: false,
            references: {
                model: 'workout_sessions',
                key: 'id'
            }
        },
        exercise_name: { type: DataTypes.STRING(50), allowNull: false },
        set_number: { type: DataTypes.INTEGER, allowNull: false },
        weight: { type: DataTypes.FLOAT },
        reps: { type: DataTypes.INTEGER },
        previous: { type: DataTypes.STRING(20) }
    },
    {
        tableName: 'workout_exercises',
        timestamps: false
    }
);
