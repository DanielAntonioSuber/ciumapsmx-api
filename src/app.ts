import express from 'express'
import { APP_PORT } from './config/app'

const app = express()

// Settings
app.set('port', APP_PORT)

// Middlewares


// Routes

export default app