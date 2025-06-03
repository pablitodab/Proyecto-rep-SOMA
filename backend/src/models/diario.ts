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
  declare id: number;
  declare titulo: string;
  declare fecha: Date;
  declare texto: string;
  declare userId: number;
}

Diario.init({
  titulo: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
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
  tableName: 'Diario',
  freezeTableName: true,
  timestamps: false
});

export default Diario;
