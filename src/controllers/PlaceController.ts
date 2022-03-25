import { Request, Response, Express } from 'express'
import PlaceService from '../services/PlaceService'

class PlaceController {
  service = new PlaceService()
  createPlace = async (req: Request, res: Response) => {
    if (req.files) {
      const images = (req.files as Express.Multer.File[]).map((file) => ({
        name: file.filename,
        path: file.path
      }))
      this.service.createPlace({ ...req.body, images })
    }
    res.status(201)
    // if (req.files && req.files) {
    //   return res.status(400).json({ message: 'Not images' })
    // }

    // const newPlace = await this.service.createPlace(req.body)
    // if (newPlace) {
    //   return res.status(201).json({ message: 'Place was created' })
    // }
    // res.status(400).json({ message: 'error' })
  }
}

export default PlaceController
