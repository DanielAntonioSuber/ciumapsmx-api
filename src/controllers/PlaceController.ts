import { Request, Response, Express } from 'express'
import PlaceService from '../services/PlaceService'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/app'

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
    res.status(201).json({ message: 'El lugar fue creado' })
  }

  getAllPlaces = async (req: Request, res: Response) => {
    const places = await this.service.getAllPlaces()
    res.json(places)
  }

  getPlaceById = async (req: Request, res: Response) => {
    if (req.params.id) {
      const place = await this.service.getPlaceById(parseInt(req.params.id))
      res.status(200).json(place)
    }
  }

  commentPlace = async (req: Request, res: Response) => {
    const { text } = req.body
    const { id } = jwt.verify(
      req.headers.authorization!.split(' ')[1],
      JWT_SECRET
    ) as { id: string }
    const placeId = req.params.id

    if (placeId) {
      const comment = await this.service.commentPlace(req.params.id, id, text)
      res.status(201).json(comment)
    }
  }

  ratePlace = async (req: Request, res: Response) => {
    const { starScore, securityScore } = req.body
    const { id } = jwt.verify(
      req.headers.authorization!.split(' ')[1],
      JWT_SECRET
    ) as { id: string }
    const placeId = req.params.id

    if (placeId) {
      const scores = await this.service.ratePlace(
        parseInt(placeId),
        parseInt(id),
        securityScore,
        starScore
      )

      res.status(201).json(scores)
    }
  }

  updateRatePlace = async (req: Request, res: Response) => {
    const { id, starScore, securityScore } = req.body
    const upatedScore = await this.service.updateRatePlace(
      id,
      securityScore,
      starScore
    )
    res.status(200).json(upatedScore)
  }

  getScorePlace = async (req: Request, res: Response) => {
    const user = jwt.verify(
      req.headers.authorization!.split(' ')[1],
      JWT_SECRET
    ) as { id: string }
    const placeId = req.params.id

    if (placeId) {
      const rates = await this.service.getScorePlace(
        parseInt(user.id),
        parseInt(placeId)
      )

      res.json(rates)
    }
  }

  getCommentsFromPlace = async (req: Request, res: Response) => {
    const placeId = req.params.id
    const comments = await this.service.getPlaceComments(placeId)
    res.status(200).json(comments)
  }

  getRecommendedPlaces = async (req: Request, res: Response) => {}
}

export default PlaceController
