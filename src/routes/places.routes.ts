import { Router } from 'express'
import multer from 'multer'
import PlaceController from '../controllers/PlaceController'
import path from 'path'
import PlaceValidator from '../validators/PlaceValidator'

const router = Router()
const controller = new PlaceController()
const validator = new PlaceValidator()
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const name =
      file.fieldname + '_' + Date.now() + path.extname(file.originalname)
    cb(null, name)
  }
})
const upload = multer({
  storage
})

router.post(
  '/',
  [upload.array('imageOfPlace', 5), ...validator.createPlace],
  controller.createPlace
)

router.get('/', controller.getAllPlaces)

router.get('/:id', controller.getPlaceById)

export default router
