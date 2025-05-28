import { sequelize } from '../database/connection';
import { DataTypes } from '@sequelize/core';
import { User } from './user';

export const Routine = sequelize.define(
    'Routine',
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
        day: { type: DataTypes.STRING(20), allowNull: false },
        description: { type: DataTypes.STRING(100), allowNull: false }
    },
    {
        tableName: 'routines',
        timestamps: false
    }
);
