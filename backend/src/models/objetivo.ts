import { DataTypes, Model } from '@sequelize/core';
import { sequelize } from '../database/connection';
import User from './user';

interface ObjetivoAttributes {
  id: number;
  nombre: string;
  fechaFin: Date;
  importancia: 'alta' | 'media' | 'baja';
  cumplido: boolean;
  userId: number;
}

class Objetivo extends Model<ObjetivoAttributes> implements ObjetivoAttributes {
  public id!: number;
  public nombre!: string;
  public fechaFin!: Date;
  public importancia!: 'alta' | 'media' | 'baja';
  public cumplido!: boolean;
  public userId!: number;
}

Objetivo.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  fechaFin: { type: DataTypes.DATE, allowNull: false },
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
  timestamps: true
});

export default Objetivo;
