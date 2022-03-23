import { Options, Sequelize } from 'sequelize'
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER
} from '../config/database'
import setupModels from './setupModels'

const options: Options = {
  dialect: 'mysql',
  host: DB_HOST,
  port: DB_PORT
}

const db = new Sequelize(DB_DATABASE!, DB_USER, DB_PASSWORD, options)

setupModels(db)

export default db
