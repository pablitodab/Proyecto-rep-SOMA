import { Sequelize } from '@sequelize/core';
import { MariaDbDialect } from '@sequelize/mariadb';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  dialect: MariaDbDialect,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
});

export { sequelize };
