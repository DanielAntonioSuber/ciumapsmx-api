import { Request, Response } from 'express'
import PlaceService from '../services/PlaceService'

class PlaceController {
  
  service = new PlaceService()
  createPlace = async (req: Request, res: Response) => {
    console.log(req.body)
    res.json({ a: 'a' })
  }
}

export default PlaceController
