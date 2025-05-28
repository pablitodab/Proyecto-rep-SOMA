import { DataTypes, Model } from '@sequelize/core';
import { sequelize } from '../database/connection';
import User from './user';

interface DiarioAttributes {
  id?: number;
  titulo: string;
  fecha: Date;
  texto: string;
  userId: number;
}

class Diario extends Model<DiarioAttributes> implements DiarioAttributes {
  public id!: number;
  public titulo!: string;
  public fecha!: Date;
  public texto!: string;
  public userId!: number;
}

Diario.init({
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  texto: {
    type: DataTypes.TEXT,
    allowNull: false
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
  modelName: 'Diario',
  timestamps: false
});

export default Diario;
