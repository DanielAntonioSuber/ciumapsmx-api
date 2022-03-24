import { Router } from 'express'
import authRoutes from './auth.routes'
import placesRoutes from './places.routes'

const router = Router()

router.get('/', (req, res) => res.json('API v1'))
router.use('/auth', authRoutes)
router.use('/places', placesRoutes)

export default router
