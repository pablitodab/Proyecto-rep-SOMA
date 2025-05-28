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
  public id!: number;
  public fecha!: Date;
  public calorias_ingeridas!: number;
  public calorias_gastadas!: number;
  public km_caminados!: number;
  public cardio_realizado1?: string;
  public tiempo_cardio1?: number;
  public distancia_cardio1?: number;
  public cardio_realizado2?: string;
  public tiempo_cardio2?: number;
  public distancia_cardio2?: number;
  public carbohidratos?: number;
  public proteinas?: number;
  public grasas?: number;
  public userId!: number;
}

Nutricion.init({
  fecha: {
    type: DataTypes.DATE,
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
    type: DataTypes.STRING(100),
    allowNull: true
  },
  tiempo_cardio1: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  distancia_cardio1: {
    type: DataTypes.DECIMAL(5,2),
    allowNull: true
  },
  cardio_realizado2: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  tiempo_cardio2: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  distancia_cardio2: {
    type: DataTypes.DECIMAL(5,2),
    allowNull: true
  },
  carbohidratos: {
    type: DataTypes.DECIMAL(6,2),
    allowNull: true
  },
  proteinas: {
    type: DataTypes.DECIMAL(6,2),
    allowNull: true
  },
  grasas: {
    type: DataTypes.DECIMAL(6,2),
    allowNull: true
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
  timestamps: false
});

export default Nutricion;
