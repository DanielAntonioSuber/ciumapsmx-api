/* eslint-disable import/first */
import { config } from 'dotenv'; config()
import app from './app'

app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'))
})
