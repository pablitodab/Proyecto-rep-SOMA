import { sequelize } from '../database/connection';
import { DataTypes } from '@sequelize/core';
import { User } from './user';

export const WorkoutSession = sequelize.define(
    'WorkoutSession',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        user_id: { 
            type: DataTypes.INTEGER, 
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        date: { type: DataTypes.DATEONLY, allowNull: false },
        routine_day: { type: DataTypes.STRING(20), allowNull: false }
    },
    {
        tableName: 'workout_sessions',
        timestamps: false
    }
);
