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
import { PlaceScore } from './PlaceScore'
import { Comment } from './Comment'
import { Place } from './Place'

const USER_TABLE = 'users'

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
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

  declare getPlaceScores: HasManyGetAssociationsMixin<PlaceScore>
  declare addPlaceScore: HasManyAddAssociationMixin<PlaceScore, number>
  declare addPlaceScores: HasManyAddAssociationsMixin<PlaceScore, number>
  declare setPlaceScores: HasManySetAssociationsMixin<PlaceScore, number>
  declare removePlaceScore: HasManyRemoveAssociationMixin<PlaceScore, number>
  declare removePlaceScores: HasManyRemoveAssociationsMixin<PlaceScore, number>

  declare hasPlaceScore: HasManyHasAssociationMixin<PlaceScore, number>
  declare hasPlaceScores: HasManyHasAssociationsMixin<PlaceScore, number>
  declare countPlaceScores: HasManyCountAssociationsMixin
  declare createPlaceScore: HasManyCreateAssociationMixin<PlaceScore, 'placeId'>

  declare getComments: HasManyGetAssociationsMixin<Comment>
  declare addComment: HasManyAddAssociationMixin<Comment, number>
  declare addComments: HasManyAddAssociationsMixin<Comment, number>
  declare setComments: HasManySetAssociationsMixin<Comment, number>
  declare removeComment: HasManyRemoveAssociationMixin<Comment, number>
  declare removeComments: HasManyRemoveAssociationsMixin<Comment, number>
  declare hasComment: HasManyHasAssociationMixin<Comment, number>
  declare hasComments: HasManyHasAssociationsMixin<Comment, number>
  declare countComments: HasManyCountAssociationsMixin
  declare createComment: HasManyCreateAssociationMixin<Comment, 'userId'>

  declare getPlaces: HasManyGetAssociationsMixin<Place> // Note the null assertions!
  declare addPlace: HasManyAddAssociationMixin<Place, number>
  declare addPlaces: HasManyAddAssociationsMixin<Place, number>
  declare setPlaces: HasManySetAssociationsMixin<Place, number>
  declare removePlace: HasManyRemoveAssociationMixin<Place, number>
  declare removePlaces: HasManyRemoveAssociationsMixin<Place, number>
  declare hasPlace: HasManyHasAssociationMixin<Place, number>
  declare hasPlaces: HasManyHasAssociationsMixin<Place, number>
  declare countPlaces: HasManyCountAssociationsMixin
  declare createPlace: HasManyCreateAssociationMixin<Place, 'userId'>

  declare role?: NonAttribute<Role>
  declare image?: NonAttribute<Image>
  declare PlaceScores?: NonAttribute<PlaceScore>
  declare comments?: NonAttribute<Comment>
  declare places?: NonAttribute<Place>

  declare static associations: {
    role: Association<User, PlaceScore>
    placeScores: Association<User, PlaceScore>
    image: Association<User, Image>
    comments: Association<User, Comment>
    places: Association<User, Place>
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
