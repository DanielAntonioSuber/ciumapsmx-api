import express from 'express'
import { APP_PORT } from './config/app'
import routerApi from './routes'
import initialSetup from './utils/initialSetup'
const app = express()

// Settings
initialSetup().then(() => console.log('Initial Setup'))

app.set('port', APP_PORT)

// Middlewares

// Routes
app.use('api/v1', routerApi)

export default app
