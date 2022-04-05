/* eslint-disable import/first */
import { config } from 'dotenv'
config()
import db from './database/connection'
import app from './app'

db.authenticate()
  .then(() => console.log('Database connected'))
  .catch(() => {
    console.log('Database error')
  })

app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'))
})
