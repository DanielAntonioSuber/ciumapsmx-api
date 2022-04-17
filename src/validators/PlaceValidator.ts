import { NextFunction, Request, Response } from 'express'
import { body } from 'express-validator'
import PlaceService from '../services/PlaceService'
import validateResult from '../utils/validateResult'
// TODO: validar el tipo (kind) de acuerdo a la base de datos

async function checkDuplicatePlace (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const placeService = new PlaceService()
  const place = await placeService.getPlaceByName(req.body.name)
  if (place) {
    return res.status(400).json({ message: 'The place already exist' })
  }
  next()
}

class PlaceValidator {
  createPlace = [
    body('name').exists().notEmpty().isString(),
    checkDuplicatePlace,
    body('description').exists().notEmpty().isString(),
    body('direction').exists().notEmpty().isString(),
    body('kind').exists().notEmpty().isString(),
    validateResult
  ]
}

export default PlaceValidator
