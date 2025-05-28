import { Sequelize } from '@sequelize/core';
import { MariaDbDialect } from '@sequelize/mariadb';

const sequelize = new Sequelize({
  dialect: MariaDbDialect,
  database: 'proyecto_db',
  user: 'proyecto_usr',
  password: 'LolerS33://usr',
  host: 'localhost',
  port: 3306,
});

export { sequelize };
