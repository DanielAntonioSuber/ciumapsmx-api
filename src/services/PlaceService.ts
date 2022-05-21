import { Op, Sequelize } from 'sequelize'
import { Comment } from '../database/models/Comment'
import { Image } from '../database/models/Image'
import { ImageOfPlace } from '../database/models/ImageOfPlace'
import { KindOfPlace } from '../database/models/KindOfPlace'
import { Place } from '../database/models/Place'
import { PlaceScore } from '../database/models/PlaceScore'
import { User } from '../database/models/User'

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
        attributes: [
          'id',
          'name',
          'description',
          'direction',
          [
            Sequelize.fn('AVG', Sequelize.col('placeScores.starScore')),
            'starRating'
          ],
          [
            Sequelize.fn('AVG', Sequelize.col('placeScores.securityScore')),
            'securityRating'
          ]
        ],
        include: [
          {
            association: Place.associations.imageOfPlaces,
            attributes: ['id', 'imageId'],
            limit: 1,
            separate: true,
            include: {
              association: ImageOfPlace.associations.image,
              attributes: ['path', 'name']
            } as any
          },
          {
            association: Place.associations.kindOfPlace,
            attributes: ['name']
          },
          {
            association: Place.associations.placeScores,
            attributes: []
          }
        ],
        group: ['Place.id']
      })
    ).map(adapaterPlace)

  getPlacesByQuery = async (query: string) =>
    (
      await Place.findAll({
        attributes: [
          'id',
          'name',
          'description',
          'direction',
          [
            Sequelize.fn('AVG', Sequelize.col('placeScores.starScore')),
            'starRating'
          ],
          [
            Sequelize.fn('AVG', Sequelize.col('placeScores.securityScore')),
            'securityRating'
          ]
        ],
        include: [
          {
            association: Place.associations.imageOfPlaces,
            attributes: ['id', 'imageId'],
            limit: 1,
            separate: true,
            include: {
              association: ImageOfPlace.associations.image,
              attributes: ['path', 'name']
            } as any
          },
          {
            association: Place.associations.kindOfPlace,
            attributes: ['name']
          },
          {
            association: Place.associations.placeScores,
            attributes: []
          }
        ],
        group: ['Place.id'],
        where: {
          name: { [Op.like]: '%' + query + '%' }
        }
      })
    ).map(adapaterPlace)

  getPlaceById = async (id: number) =>
    adapaterPlace(
      await Place.findByPk(id, {
        attributes: [
          'id',
          'name',
          'description',
          'direction',
          [
            Sequelize.fn('AVG', Sequelize.col('placeScores.starScore')),
            'starRating'
          ],
          [
            Sequelize.fn('AVG', Sequelize.col('placeScores.securityScore')),
            'securityRating'
          ]
        ],
        include: [
          {
            association: Place.associations.imageOfPlaces,
            attributes: ['id', 'imageId'],
            separate: true,
            include: {
              association: ImageOfPlace.associations.image,
              attributes: ['path', 'name']
            } as any
          },
          {
            association: Place.associations.kindOfPlace,
            attributes: ['name']
          },
          {
            association: Place.associations.placeScores,
            attributes: []
          }
        ],
        group: ['Place.id']
      })
    )

  getPlaceByName = async (name: string) =>
    await Place.findOne({ where: { name: name } })

  commentPlace = async (placeId: string, userId: number, text: string) => {
    const place = await Place.findByPk(placeId)
    const user = await User.findByPk(userId)
    const comment = await place!.createComment({
      text,
      userId: user?.id!
    })
    return Comment.findByPk(comment.id, {
      attributes: ['id', 'text', ['updatedAt', 'date']],
      include: {
        attributes: ['username'],
        association: Comment.associations.user,
        include: {
          attributes: ['path', 'name'],
          association: User.associations.image
        } as any
      }
    })
  }

  getPlaceComments = async (placeId: string) => {
    const place = await Place.findByPk(placeId)
    const comments = await place?.getComments({
      attributes: ['id', 'text', ['updatedAt', 'date']],
      include: {
        attributes: ['username'],
        association: Comment.associations.user,
        include: {
          attributes: ['path', 'name'],
          association: User.associations.image
        } as any
      }
    })
    return comments
  }

  ratePlace = async (
    placeId: number,
    userId: number,
    securityScore: number,
    starScore: number
  ) => {
    const [placeScore, created] = await PlaceScore.findOrCreate({
      where: { userId, placeId },
      defaults: {
        securityScore,
        starScore,
        placeId,
        userId
      }
    })
    return created
      ? { id: placeScore?.id, securityScore, starScore }
      : {
          id: placeScore.id,
          securityScore: placeScore.securityScore,
          starScore: placeScore.starScore
        }
  }

  updateRatePlace = async (
    placeScoreId: string,
    securityScore: number,
    starScore: number
  ) => {
    const placeScore = await PlaceScore.findByPk(placeScoreId)
    const updatedPlaceScore = await placeScore?.update({
      securityScore,
      starScore
    })
    return {
      id: updatedPlaceScore?.id,
      securityScore: updatedPlaceScore?.securityScore,
      starScore: updatedPlaceScore?.starScore
    }
  }

  getScorePlace = async (userId: number, placeId: number) => {
    return await PlaceScore.findOne({
      where: { userId: userId, placeId: placeId },
      attributes: ['id', 'securityScore', 'starScore']
    })
  }
}

function adapaterPlace (place: Place | null) {
  if (place) {
    return {
      id: place.id,
      name: place.name,
      description: place.description,
      direction: place.direction,
      kind: place.kindOfPlace?.name,
      starRating: parseFloat(place.get('starRating') as string),
      securityRating: parseFloat(place.get('securityRating') as string),
      images: place.imageOfPlaces?.map((e) => e.image),
      createdAt: place.createdAt,
      updatedAt: place.updatedAt
    }
  }
}

export default PlaceService
