import { DataTypes, Model } from '@sequelize/core';
import { sequelize } from '../database/connection';
import User from './user';

interface ObjetivoAttributes {
    id?: number;
    nombre: string;
    descripcion?: string;
    fechaFin: Date;
    importancia: 'alta' | 'media' | 'baja';
    cumplido: boolean;
    userId: number;
}

class Objetivo extends Model<ObjetivoAttributes> implements ObjetivoAttributes {
    declare id: number;
    declare nombre: string;
    declare descripcion?: string;
    declare fechaFin: Date;
    declare importancia: 'alta' | 'media' | 'baja';
    declare cumplido: boolean;
    declare userId: number;
}

Objetivo.init({
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    descripcion: {  // AÑADIDO
        type: DataTypes.TEXT,
        allowNull: true
    },
    fechaFin: {
        type: DataTypes.DATE,
        allowNull: false
    },
    importancia: {
        type: DataTypes.ENUM('alta', 'media', 'baja'),
        defaultValue: 'media'
    },
    cumplido: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'Objetivo',
    tableName: 'Objetivos',
    freezeTableName: true,
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
});

export default Objetivo;
