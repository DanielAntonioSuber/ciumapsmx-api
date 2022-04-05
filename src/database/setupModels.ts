import { Sequelize } from 'sequelize'
import { Image, ImageAttributes } from './models/Image'
import { ImageOfPlace, ImageOfPlaceAttributes } from './models/ImageOfPlace'
import { KindOfPlace, KindOfPlaceAttributes } from './models/KindOfPlace'
import { Place, PlaceAttributes } from './models/Place'
import { PlaceReview, PlaceReviewAttributes } from './models/PlaceReview'
import { Role, RoleAttributes } from './models/Role'
import { User, UserAttributes } from './models/User'

async function setupModels (sequelize: Sequelize) {
  User.init(UserAttributes, User.config(sequelize))
  Role.init(RoleAttributes, Role.config(sequelize))
  Image.init(ImageAttributes, Image.config(sequelize))
  PlaceReview.init(PlaceReviewAttributes, PlaceReview.config(sequelize))
  ImageOfPlace.init(ImageOfPlaceAttributes, ImageOfPlace.config(sequelize))
  KindOfPlace.init(KindOfPlaceAttributes, KindOfPlace.config(sequelize))
  Place.init(PlaceAttributes, Place.config(sequelize))

  Role.hasMany(User, {
    foreignKey: 'roleId'
  })
  User.belongsTo(Role, { foreignKey: 'roleId' })

  Image.hasMany(User, {
    foreignKey: 'avatarImage'
  })
  User.belongsTo(Image, { foreignKey: 'avatarImage' })

  User.hasMany(PlaceReview, {
    foreignKey: 'userId'
  })
  PlaceReview.belongsTo(User, { foreignKey: 'userId' })

  Place.hasMany(PlaceReview, {
    foreignKey: 'placeId'
  })
  PlaceReview.belongsTo(Place, { foreignKey: 'placeId' })

  KindOfPlace.hasMany(Place, {
    foreignKey: 'kind'
  })
  Place.belongsTo(KindOfPlace, { foreignKey: 'kind' })

  Image.hasMany(ImageOfPlace, {
    foreignKey: 'imageId'
  })
  ImageOfPlace.belongsTo(Image, {
    foreignKey: 'imageId'
  })

  Place.hasMany(ImageOfPlace, {
    foreignKey: 'placeId'
  })
  ImageOfPlace.belongsTo(ImageOfPlace, { foreignKey: 'placeId' })
}

export default setupModels
