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
  public id!: number;
  public dia!: 'lunes' | 'martes' | 'miércoles' | 'jueves' | 'viernes' | 'sábado' | 'domingo';
  public descripcion!: string;
  public enfoque!: string;
  public cardio!: boolean;
  public userId!: number;
}

Rutina.init({
  dia: {
    type: DataTypes.ENUM('lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  enfoque: {
    type: DataTypes.STRING,
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
  timestamps: false
});

export default Rutina;
