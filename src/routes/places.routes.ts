import { Router } from 'express'
import PlaceController from '../controllers/PlaceController'

const router = Router()
const controller = new PlaceController()

router.post('', controller.createPlace)

export default router
