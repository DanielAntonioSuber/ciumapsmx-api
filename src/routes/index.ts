import { Router } from 'express'
import passport from 'passport'
import authRoutes from './auth.routes'
import placesRoutes from './places.routes'
import userRoutes from './users.routes'
import faqsRoutes from './faqs.routes'

const router = Router()

router.get('/', (req, res) => res.json('API v1'))
router.use('/auth', authRoutes)
router.use(
  '/places',
  passport.authenticate('jwt', { session: false }),
  placesRoutes
)
router.use(
  '/users',
  passport.authenticate('jwt', { session: false }),
  userRoutes
)
router.use('/faqs', faqsRoutes)

export default router
