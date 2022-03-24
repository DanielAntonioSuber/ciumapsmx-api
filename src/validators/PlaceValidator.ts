import { check } from 'express-validator'
import validateResult from '../utils/validateResult'

class PlaceValidator {
  createPlace = [
    check('name').exists().isString(),
    check('description').exists().isString(),
    check('direction').exists().isString(),
    check('type').exists().isString(),
    validateResult
  ]
}

export default PlaceValidator
