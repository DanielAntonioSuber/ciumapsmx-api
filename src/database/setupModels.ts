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
    foreignKey: 'role'
  })
  User.belongsTo(Role, { foreignKey: 'role' })

  Image.hasMany(User, {
    foreignKey: 'avatarImage'
  })
  User.belongsTo(Image, { foreignKey: 'avatarImage' })

  User.hasMany(PlaceReview, {
    foreignKey: 'user'
  })
  PlaceReview.belongsTo(User, { foreignKey: 'user' })

  Place.hasMany(PlaceReview, {
    foreignKey: 'place'
  })
  PlaceReview.belongsTo(Place, { foreignKey: 'place' })

  KindOfPlace.hasMany(Place, {
    foreignKey: 'kind'
  })
  Place.belongsTo(KindOfPlace, { foreignKey: 'kind' })

  Image.hasMany(ImageOfPlace, {
    foreignKey: 'placeImage'
  })
  ImageOfPlace.belongsTo(Image, {
    foreignKey: 'placeImage'
  })

  Place.hasMany(ImageOfPlace, {
    foreignKey: 'place'
  })
  ImageOfPlace.belongsTo(ImageOfPlace, { foreignKey: 'place' })
}

export default setupModels
