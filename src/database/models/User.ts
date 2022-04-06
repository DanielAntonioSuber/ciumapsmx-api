import {
  Association,
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  CreationOptional,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  InitOptions,
  Model,
  ModelAttributes,
  NonAttribute,
  Sequelize
} from 'sequelize'
import bcrypt from 'bcrypt'
import { Role } from './Role'
import { Image } from './Image'
import { PlaceReview } from './PlaceReview'

const USER_TABLE = 'users'

class User extends Model<
  InferAttributes<User, { omit: 'placeReviews' }>,
  InferCreationAttributes<User, { omit: 'placeReviews' }>
> {
  declare id: CreationOptional<number>
  declare roleId: number
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

  declare getPlaceReviews: HasManyGetAssociationsMixin<PlaceReview>
  declare addPlaceReview: HasManyAddAssociationMixin<PlaceReview, number>
  declare addPlaceReviews: HasManyAddAssociationsMixin<PlaceReview, number>
  declare setPlaceReviews: HasManySetAssociationsMixin<PlaceReview, number>
  declare removePlaceReview: HasManyRemoveAssociationMixin<PlaceReview, number>
  declare removePlaceReviews: HasManyRemoveAssociationsMixin<
    PlaceReview,
    number
  >

  declare hasPlaceReview: HasManyHasAssociationMixin<PlaceReview, number>
  declare hasPlaceReviews: HasManyHasAssociationsMixin<PlaceReview, number>
  declare countPlaceReviews: HasManyCountAssociationsMixin
  declare createPlaceReview: HasManyCreateAssociationMixin<
    PlaceReview,
    'placeId'
  >

  declare role?: NonAttribute<Role>
  declare image?: NonAttribute<Image>
  declare placeReviews?: NonAttribute<PlaceReview>

  declare static associations: {
    role: Association<User, PlaceReview>
    placeReviews: Association<User, PlaceReview>
    image: Association<User, Image>
  }

  static config (sequelize: Sequelize): InitOptions<User> {
    return {
      sequelize,
      tableName: USER_TABLE
    }
  }
}

const UserAttributes: ModelAttributes<User, InferAttributes<User>> = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  roleId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
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
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}

export { User, UserAttributes }
