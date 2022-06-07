import { Router } from 'express'
import passport from 'passport'
import authRoutes from './auth.routes'
import placesRoutes from './places.routes'
import userRoutes from './users.routes'
import faqsRoutes from './faqs.routes'
import reportsRoutes from './reports.routes'
const router = Router()

router.get('/', (req, res) => res.json('API v1'))
router.use('/auth', authRoutes)

router.use('/reports', reportsRoutes)
router.use('/faqs', faqsRoutes)

router.use('/', passport.authenticate('jwt', { session: false }))
router.use('/places', placesRoutes)
router.use('/users', userRoutes)

export default router
