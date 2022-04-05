/* eslint-disable import/first */
import { config } from 'dotenv'
config()
import db from './database/connection'

db.authenticate()
  .then(() => console.log('Database connected'))
  .catch(() => {
    console.log('Database error')
  })

