import { Router } from 'express'
import authRoutes from './auth.routes'

const router = Router()

router.get('/', (req, res) => res.json('API v1'))
router.use('/auth', authRoutes)

export default router
