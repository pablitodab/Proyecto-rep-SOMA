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
  public id!: number;
  public name!: string;
  public lastname!: string;
  public email!: string;
  public password!: string;
  public credential!: string;
  public status!: number;
}

User.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  lastname: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  credential: { type: DataTypes.STRING, unique: true, allowNull: false },
  status: { type: DataTypes.INTEGER, allowNull: false }
}, {
  sequelize,
  modelName: 'User',
  timestamps: false
});

export default User;
