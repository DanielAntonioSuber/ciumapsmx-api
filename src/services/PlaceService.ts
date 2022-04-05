import { Image } from '../database/models/Image'
import { KindOfPlace } from '../database/models/KindOfPlace'

class PlaceService {
  typesOfPlaces = ['Museum', 'Monument', 'Park', 'Restaurant']

  createInitialValues = async () => {
    const result = await KindOfPlace.findAndCountAll()
    if (result.count === 0) {
      for (const place of this.typesOfPlaces) {
        KindOfPlace.create({ name: place })
      }
      console.log('Types of places was created')
    }
  }

  createPlace = async ({
    name,
    description,
    direction,
    kind,
    images
  }: {
    name: string
    description: string
    direction: string
    kind: string
    images: { name: string; path: string }[]
  }) => {
    const kindOfPlace = (await KindOfPlace.findOne({ where: { name: kind } }))!
    const newPlace = await kindOfPlace.createPlace({
      description,
      direction,
      name
    })

    images.forEach(async (image) =>
      newPlace.createImageOfPlace({
        imageId: (await Image.create(image)).id
      })
    )
    return newPlace
  }
}

export default PlaceService
