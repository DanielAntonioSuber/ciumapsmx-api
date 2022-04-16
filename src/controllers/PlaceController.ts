import { Request, Response, Express } from 'express'
import PlaceService from '../services/PlaceService'

class PlaceController {
  service = new PlaceService()

  createPlace = async (req: Request, res: Response) => {
    if (req.files) {
      const images = (req.files as Express.Multer.File[]).map((file) => ({
        name: file.fieldname,
        path: 'api ' + file.filename
      }))
      this.service.createPlace({ ...req.body, images })
    }
    res.status(201).json({ message: 'Place was created' })
  }

  getAllPlaces = async (req: Request, res: Response) => {
    const places = await this.service.getAllPlaces()
    res.json(places)
  }

  getPlaceById = async (req: Request, res: Response) => {
    if (req.params.id) {
      const place = await this.service.getPlaceById(parseInt(req.params.id))
      res.json(place)
    }
  }
}

export default PlaceController
