import { Image } from '../database/models/Image'
import { ImageOfPlace } from '../database/models/ImageOfPlace'
import { KindOfPlace } from '../database/models/KindOfPlace'
import { Place } from '../database/models/Place'

type createPlaceProps = {
  name: string
  description: string
  direction: string
  kind: string
  images: { name: string; path: string }[]
}

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
  }: createPlaceProps) => {
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

  getAllPlaces = async () => {
    return await Place.findAll({
      attributes: ['id', 'name', 'description', 'direction'],
      include: [
        {
          association: Place.associations.imageOfPlaces,
          attributes: ['id'],
          required: true,
          include: {
            association: ImageOfPlace.associations.image,
            attributes: ['path', 'name']
          }
        } as any,
        {
          association: Place.associations.kindOfPlace,
          attributes: ['name']
        }
      ]
    })
  }

  getPlaceById = async (id: number) => {
    return await Place.findByPk(id, {
      include: [
        {
          association: Place.associations.imageOfPlaces,
          attributes: ['id'],
          required: true,
          include: {
            association: ImageOfPlace.associations.image,
            attributes: ['path', 'name']
          }
        } as any,
        {
          association: Place.associations.kindOfPlace,
          attributes: ['name']
        }
      ]
    })
  }
}

export default PlaceService
