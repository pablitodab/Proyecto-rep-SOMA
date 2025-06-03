import { DataTypes, Model } from '@sequelize/core';
import { sequelize } from '../database/connection';
import User from './user';

interface NutricionAttributes {
  id?: number;
  fecha: Date;
  calorias_ingeridas: number;
  calorias_gastadas: number;
  km_caminados: number;
  cardio_realizado1?: string;
  tiempo_cardio1?: number;
  distancia_cardio1?: number;
  cardio_realizado2?: string;
  tiempo_cardio2?: number;
  distancia_cardio2?: number;
  carbohidratos?: number;
  proteinas?: number;
  grasas?: number;
  userId: number;
}

class Nutricion extends Model<NutricionAttributes> implements NutricionAttributes {
  declare id: number;
  declare fecha: Date;
  declare calorias_ingeridas: number;
  declare calorias_gastadas: number;
  declare km_caminados: number;
  declare cardio_realizado1?: string;
  declare tiempo_cardio1?: number;
  declare distancia_cardio1?: number;
  declare cardio_realizado2?: string;
  declare tiempo_cardio2?: number;
  declare distancia_cardio2?: number;
  declare carbohidratos?: number;
  declare proteinas?: number;
  declare grasas?: number;
  declare userId: number;
}

Nutricion.init({
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  calorias_ingeridas: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  calorias_gastadas: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  km_caminados: {
    type: DataTypes.DECIMAL(5,2),
    allowNull: false
  },
  cardio_realizado1: {
    type: DataTypes.STRING(100)
  },
  tiempo_cardio1: {
    type: DataTypes.INTEGER
  },
  distancia_cardio1: {
    type: DataTypes.DECIMAL(5,2)
  },
  cardio_realizado2: {
    type: DataTypes.STRING(100)
  },
  tiempo_cardio2: {
    type: DataTypes.INTEGER
  },
  distancia_cardio2: {
    type: DataTypes.DECIMAL(5,2)
  },
  carbohidratos: {
    type: DataTypes.DECIMAL(6,2)
  },
  proteinas: {
    type: DataTypes.DECIMAL(6,2)
  },
  grasas: {
    type: DataTypes.DECIMAL(6,2)
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
  modelName: 'Nutricion',
  tableName: 'Nutricion',
  freezeTableName: true,
  timestamps: false
});

export default Nutricion;
