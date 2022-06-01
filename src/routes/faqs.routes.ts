import { Router } from 'express'
import passport from 'passport'
import FAQcontroller from '../controllers/FAQcontroller'

const router = Router()
const controller = new FAQcontroller()

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  controller.createFAQ
)

router.get('/', controller.getFAQs)

router.put('/:id', controller.editFAQ)

router.delete('/:id', controller.deleteFAQ)

export default router
