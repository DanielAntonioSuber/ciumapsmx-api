import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import { APP_PORT } from './config/app'
import routerApi from './routes'
import initialSetup from './utils/initialSetup'
import passportMiddleware from './middlewares/passport'
import passport from 'passport'
const app = express()

// Settings
initialSetup().then(() => console.log('Initial Setup'))

app.set('port', APP_PORT)

// Middlewares
app.use(morgan('dev'))
app.use(helmet())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(express.json())
app.use(passport.initialize())
passport.use(passportMiddleware)

// Routes
app.use('/api/v1', routerApi)
app.use('/images', express.static(path.resolve('public/images')))

export default app
