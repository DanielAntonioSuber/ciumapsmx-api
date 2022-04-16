import { body } from 'express-validator'
import validateResult from '../utils/validateResult'
// TODO: validar el tipo (kind) de acuerdo a la base de datos

// validar si el nombre no está repetido
class PlaceValidator {
  createPlace = [
    body('name').exists().notEmpty().isString(),
    body('description').exists().notEmpty().isString(),
    body('direction').exists().notEmpty().isString(),
    body('kind').exists().notEmpty().isString(),
    validateResult
  ]
}

export default PlaceValidator
