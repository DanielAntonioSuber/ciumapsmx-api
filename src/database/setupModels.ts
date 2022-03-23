import { Sequelize } from 'sequelize'
import { Image, ImageAttributes } from './models/Image'
import { Role, RoleAttributes } from './models/Role'
import { User, UserAttributes } from './models/User'

function setupModels (sequelize: Sequelize) {
  User.init(UserAttributes, User.config(sequelize))
  Role.init(RoleAttributes, Role.config(sequelize))
  Image.init(ImageAttributes, Image.config(sequelize))
}

export default setupModels
