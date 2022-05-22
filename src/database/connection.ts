import { Options, Sequelize } from 'sequelize'
import { IS_PROD } from '../config/app'
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER
} from '../config/database'
import setData from './data/setData'
import setupModels from './setupModels'

const options: Options = {
  dialect: 'mysql',
  host: DB_HOST,
  port: DB_PORT,
  logging: IS_PROD ? false : (sql) => console.log(sql)
}

const db = new Sequelize(DB_DATABASE!, DB_USER, DB_PASSWORD, options)

setupModels(db)
setData()

export default db
