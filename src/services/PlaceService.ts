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

  getAllPlaces = async () =>
    (
      await Place.findAll({
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
          },
          {
            association: Place.associations.placeReviews
          }
        ]
      })
    ).map(parsePlace)

  getPlaceById = async (id: number) =>
    parsePlace(
      await Place.findByPk(id, {
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
    )

  getPlaceByName = async (name: string) =>
    await Place.findOne({ where: { name: name } })
}

function parsePlace (place: Place | null) {
  if (place) {
    return {
      id: place.id,
      name: place.name,
      description: place.description,
      direction: place.direction,
      kind: place.kindOfPlace?.name,
      images: place.imageOfPlaces?.map((e) => e.image),
      createdAt: place.createdAt,
      updatedAt: place.updatedAt
    }
  }
}

export default PlaceService
