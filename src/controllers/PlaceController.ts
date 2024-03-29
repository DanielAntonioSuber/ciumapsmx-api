import { Request, Response, Express } from 'express'
import PlaceService from '../services/PlaceService'
import { getUserJWT } from '../utils/jwt'

class PlaceController {
  service = new PlaceService()

  createPlace = async (req: Request, res: Response) => {
    const user = getUserJWT(req)
    if (req.files) {
      const images = (req.files as Express.Multer.File[]).map((file) => ({
        name: file.fieldname,
        path: 'api ' + file.filename
      }))
      this.service.createPlace({ ...req.body, images, userId: user.id })
    }
    res.status(201).json({ message: 'El lugar fue creado' })
  }

  getAllPlaces = async (req: Request, res: Response) => {
    let places
    if (req.query.q) {
      places = await this.service.getPlacesByQuery(req.query.q! as string)
    } else if (req.query.filter) {
      req.query.filter === 'none' &&
        (places = await this.service.getAllPlaces({}))
      req.query.filter === 'unvalidated' &&
        (places = await this.service.getAllPlaces({ validated: false }))
    } else {
      places = await this.service.getAllPlaces()
    }
    res.json(places)
  }

  getPlaceById = async (req: Request<{id: string}>, res: Response) => {
    if (req.params.id) {
      let place
      if (req.query.filter) {
        req.query.filter === 'none' &&
          (place = await this.service.getPlaceById(parseInt(req.params.id), {}))
        req.query.filter === 'unvalidated' &&
          (place = await this.service.getPlaceById(parseInt(req.params.id), {
            validated: false
          }))
      } else {
        place = await this.service.getPlaceById(parseInt(req.params.id))
      }
      res.status(200).json(place)
    }
  }

  commentPlace = async (req: Request, res: Response) => {
    const { text } = req.body
    const { id } = getUserJWT(req)
    const placeId = req.params.id

    if (placeId) {
      const comment = await this.service.commentPlace(req.params.id, id, text)
      res.status(201).json(comment)
    }
  }

  ratePlace = async (req: Request, res: Response) => {
    const { starScore, securityScore } = req.body
    const user = getUserJWT(req)
    const placeId = req.params.id

    if (placeId) {
      const scores = await this.service.ratePlace(
        parseInt(placeId),
        user.id,
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
    const user = getUserJWT(req)
    const placeId = req.params.id

    if (placeId) {
      const rates = await this.service.getScorePlace(user.id, parseInt(placeId))

      res.json(rates)
    }
  }

  getCommentsFromPlace = async (req: Request, res: Response) => {
    const placeId = req.params.id
    const comments = await this.service.getPlaceComments(placeId)
    res.status(200).json(comments)
  }

  getRecommendedPlaces = async (req: Request, res: Response) => {}

  deletePlaces = async (req: Request, res: Response) => {}

  updatePlace = async (req: Request, res: Response) => {
    const placeId = req.params.id
    const place = await this.service.updatePlace(placeId, req.body)
    if (place) return res.json(place)

    res.status(400)
  }
}

export default PlaceController
