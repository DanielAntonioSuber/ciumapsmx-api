import { Sequelize } from 'sequelize'
import { Image, ImageAttributes } from './models/Image'
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
  Image.hasMany(User, {
    foreignKey: 'avatar_image',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })

  User.belongsTo(Role, { foreignKey: 'role' })
  User.belongsTo(Image, { foreignKey: 'avatar_image' })
}

export default setupModels
