import { Router } from 'express'
import PlaceController from '../controllers/PlaceController'
import PlaceValidator from '../validators/PlaceValidator'
import upload from '../utils/uploadImagesOfPlace'

const router = Router()
const controller = new PlaceController()
const validator = new PlaceValidator()

router.post(
  '/',
  [upload.array('imageOfPlace', 10), ...validator.createPlace],
  controller.createPlace
)
router.post('/:id/comments/', controller.commentPlace)
router.post('/:id/scores/', controller.ratePlace)

router.get('/', controller.getAllPlaces)
router.get('/:id/scores/', controller.getScorePlace)
router.get('/recomendations', controller.getRecommendedPlaces)
router.get('/:id/comments/', controller.getCommentsFromPlace)
router.get('/:id', controller.getPlaceById)

router.put('/scores/', controller.updateRatePlace)
router.put('/:id', controller.updatePlace)

router.delete('/:id', controller.deletePlaces)

export default router
