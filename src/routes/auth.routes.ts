import { Router } from 'express'
import AuthController from '../controllers/AuthController'
import AuthValidator from '../validators/AuthValidator'

const router = Router()
const controller = new AuthController()
const validator = new AuthValidator()

router.post('/signin', validator.signIn, controller.signIn)
router.post('/signup', validator.signUp, controller.signUp)

export default router
