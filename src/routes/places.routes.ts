import { Router } from 'express'
import multer from 'multer'
import PlaceController from '../controllers/PlaceController'
import path from 'path'

const router = Router()
const controller = new PlaceController()
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
  '',
  upload.array('imagePlace', 5),
  controller.createPlace
)

export default router
