import express from 'express'
import path from 'path'
import { APP_PORT } from './config/app'
import routerApi from './routes'
import initialSetup from './utils/initialSetup'
const app = express()

// Settings
initialSetup().then(() => console.log('Initial Setup'))

app.set('port', APP_PORT)

// Middlewares

// Routes
app.use('/api/v1', routerApi)
app.use('/images', express.static(path.resolve('public/images')))

export default app
