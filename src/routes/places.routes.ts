import { Request, Response, Router } from 'express'
import multer from 'multer'
import PlaceController from '../controllers/PlaceController'
import path from 'path'
import PlaceValidator from '../validators/PlaceValidator'
import { Place } from '../database/models/Place'

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
router.get('/', async (req: Request, res: Response) => {
  const places = await Place.findAll()
  res.json(
    await Promise.all(
      places.map(async (place) => ({
        name: place.name,
        description: place.description,
        images: await Promise.all(
          (await place.getImageOfPlaces()).map(async (img) => {
            const image = await img.getImage()
            return {
              name: image.name,
              path: image.path
            }
          })
        )
      }))
    )
  )
})

export default router
