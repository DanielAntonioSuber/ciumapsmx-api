import { Sequelize } from 'sequelize'
import { Image, ImageAttributes } from './models/Image'
import { ImageOfPlace, ImageOfPlaceAttributes } from './models/ImageOfPlace'
import { KindOfPlace, KindOfPlaceAttributes } from './models/KindOfPlace'
import { Place, PlaceAttributes } from './models/Place'
import { PlaceReview, PlaceReviewAttributes } from './models/PlaceReview'
import { Role, RoleAttributes } from './models/Role'
import { User, UserAttributes } from './models/User'

function setupModels (sequelize: Sequelize) {
  User.init(UserAttributes, User.config(sequelize))
  Role.init(RoleAttributes, Role.config(sequelize))
  Image.init(ImageAttributes, Image.config(sequelize))
  PlaceReview.init(PlaceReviewAttributes, PlaceReview.config(sequelize))
  ImageOfPlace.init(ImageOfPlaceAttributes, ImageOfPlace.config(sequelize))
  KindOfPlace.init(KindOfPlaceAttributes, KindOfPlace.config(sequelize))
  Place.init(PlaceAttributes, Place.config(sequelize))

  Role.hasMany(User, {
    foreignKey: 'role',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  User.belongsTo(Role, { foreignKey: 'role' })

  Image.hasMany(User, {
    foreignKey: 'avatar_image',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  User.belongsTo(Image, { foreignKey: 'avatar_image' })

  User.hasMany(PlaceReview, {
    foreignKey: 'user',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  PlaceReview.belongsTo(User, { foreignKey: 'user' })

  Place.hasMany(PlaceReview, {
    foreignKey: 'place',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  PlaceReview.belongsTo(Place, { foreignKey: 'place' })

  KindOfPlace.hasMany(Place, {
    foreignKey: 'kind_of_place',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  Place.belongsTo(KindOfPlace, { foreignKey: 'kind_of_place' })

  Image.hasMany(ImageOfPlace, {
    foreignKey: 'place_image',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  ImageOfPlace.belongsTo(Image, {
    foreignKey: 'place_image'
  })

  Place.hasMany(ImageOfPlace, {
    foreignKey: 'place',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  ImageOfPlace.belongsTo(ImageOfPlace, { foreignKey: 'place' })
}

export default setupModels
