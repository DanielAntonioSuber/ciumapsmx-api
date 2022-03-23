import express from 'express'
import { APP_PORT } from './config/app'
import routerApi from './routes'
const app = express()

// Settings
app.set('port', APP_PORT)

// Middlewares

// Routes
app.use('api/v1', routerApi)

export default app
