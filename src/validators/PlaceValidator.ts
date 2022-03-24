import { check } from 'express-validator'

class PlaceValidator {
  createPlace = [
    check('name').exists(),
    check('description').exists(),
    check('direction').exists(),
    check('type').exists()
  ]
}

export default PlaceValidator
