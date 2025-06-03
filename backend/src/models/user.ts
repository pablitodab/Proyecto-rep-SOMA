import { DataTypes, Model } from '@sequelize/core';
import { sequelize } from '../database/connection';

interface UserAttributes {
  id?: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  credential: string;
  status: number;
}

class User extends Model<UserAttributes> implements UserAttributes {
  declare id: number;
  declare name: string;
  declare lastname: string;
  declare email: string;
  declare password: string;
  declare credential: string;
  declare status: number;
}

User.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  credential: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'Users', // Nombre exacto de la tabla
  freezeTableName: true,
  timestamps: false
});

export default User;
