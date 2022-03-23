import { Sequelize } from 'sequelize'
import { Image, ImageAttributes } from './models/Image'
import { KindOfPlace } from './models/KindOfPlace'
import { Place } from './models/Place'
import { PlaceReview } from './models/PlaceRewie'
import { Role, RoleAttributes } from './models/Role'
import { User, UserAttributes } from './models/User'

function setupModels (sequelize: Sequelize) {
  User.init(UserAttributes, User.config(sequelize))
  Role.init(RoleAttributes, Role.config(sequelize))
  Image.init(ImageAttributes, Image.config(sequelize))

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
}

export default setupModels
