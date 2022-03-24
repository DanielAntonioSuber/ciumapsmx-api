import { KindOfPlace } from '../database/models/KindOfPlace'

class KindOfPlaceService {
  typesOfPlaces = ['Museum', 'Monument', 'Park', 'Restaurant']

  createInitialValues = async () => {
    const result = await KindOfPlace.findAndCountAll()
    if (result.count === 0) {
      for (const place of this.typesOfPlaces) {
        KindOfPlace.create({ name: place })
      }
    }
    console.log('Types of places was created')
  }
}

export default KindOfPlaceService
