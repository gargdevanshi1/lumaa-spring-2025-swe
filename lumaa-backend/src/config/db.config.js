import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config()

const sequelize = new Sequelize(process.env.SQL_DB_URL, {
  dialect: 'postgres',
  logging: false,
});

export default sequelize;