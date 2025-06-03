import { DataTypes, Model } from '@sequelize/core';
import { sequelize } from '../database/connection';
import User from './user';

interface RutinaAttributes {
  id?: number;
  dia: 'lunes' | 'martes' | 'miércoles' | 'jueves' | 'viernes' | 'sábado' | 'domingo';
  descripcion: string;
  enfoque: string;
  cardio: boolean;
  userId: number;
}

class Rutina extends Model<RutinaAttributes> implements RutinaAttributes {
  declare id: number;
  declare dia: 'lunes' | 'martes' | 'miércoles' | 'jueves' | 'viernes' | 'sábado' | 'domingo';
  declare descripcion: string;
  declare enfoque: string;
  declare cardio: boolean;
  declare userId: number;
}

Rutina.init({
  dia: {
    type: DataTypes.ENUM('lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  enfoque: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  cardio: {
    type: DataTypes.BOOLEAN,
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
  modelName: 'Rutina',
  tableName: 'Rutina',
  freezeTableName: true,
  timestamps: false
});

export default Rutina;
