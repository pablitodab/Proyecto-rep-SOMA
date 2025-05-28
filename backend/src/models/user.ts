import { sequelize } from '../database/connection';
import { DataTypes } from '@sequelize/core';

export const User = sequelize.define(
    'User',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        lastname: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, unique: true, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        credential: { type: DataTypes.STRING, unique: true, allowNull: false },
        status: { type: DataTypes.INTEGER, allowNull: false },
        creation: { type: DataTypes.DATE, defaultValue: sequelize.fn('NOW') },
    },
    {
        timestamps: false, // Desactiva los campos createdAt y updatedAt automáticos
    }
);
