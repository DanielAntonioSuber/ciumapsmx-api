import { Router } from 'express'
import UserController from '../controllers/UserController'

const router = Router()
const controller = new UserController()

router.put(':id', controller.updateUser)

export default router
