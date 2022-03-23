import {
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  InitOptions,
  Model,
  ModelAttributes,
  Sequelize
} from 'sequelize'
import bcrypt from 'bcrypt'
import { Role } from './Role'
import { Image } from './Image'

const USER_TABLE = 'users'

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>
  declare role: number
  declare username: string
  declare password: string
  declare email: string
  declare avatarImage: number
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  declare getRole: BelongsToGetAssociationMixin<Role>
  declare setRole: BelongsToSetAssociationMixin<Role, number>
  declare createRole: BelongsToCreateAssociationMixin<Role>

  declare getImage: BelongsToGetAssociationMixin<Image>
  declare setImage: BelongsToSetAssociationMixin<Image, number>
  declare createImage: BelongsToCreateAssociationMixin<Image>

  static config (sequelize: Sequelize): InitOptions<User> {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User'
    }
  }
}

const UserAttributes: ModelAttributes<User, InferAttributes<User>> = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: 'user_id',
    autoIncrement: true,
    allowNull: false
  },
  role: { type: DataTypes.INTEGER, allowNull: false },
  username: { type: DataTypes.STRING(40), allowNull: false, unique: true },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
    set (value: string) {
      this.setDataValue(
        'password',
        bcrypt.hashSync(value, bcrypt.genSaltSync(10))
      )
    }
  },
  email: { type: DataTypes.STRING(40), allowNull: false, unique: true },
  avatarImage: {
    type: DataTypes.NUMBER,
    field: 'avatar_image',
    allowNull: false
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}

export { User, UserAttributes }
