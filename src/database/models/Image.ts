import {
  Association,
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
import { APP_URL } from '../../config/app'
import { ImageOfPlace } from './ImageOfPlace'
import { User } from './User'

const IMAGE_TABLE = 'images'

class Image extends Model<
  InferAttributes<Image>,
  InferCreationAttributes<Image>
> {
  declare id: CreationOptional<number>
  declare name: string
  declare path: string

  declare getUsers: HasManyGetAssociationsMixin<User>
  declare addUser: HasManyAddAssociationMixin<User, number>
  declare addUsers: HasManyAddAssociationsMixin<User, number>
  declare setUsers: HasManySetAssociationsMixin<User, number>
  declare removeUser: HasManyRemoveAssociationMixin<User, number>
  declare removeUsers: HasManyRemoveAssociationsMixin<User, number>
  declare hasUser: HasManyHasAssociationMixin<User, number>
  declare hasUsers: HasManyHasAssociationsMixin<User, number>
  declare countUsers: HasManyCountAssociationsMixin
  declare createUser: HasManyCreateAssociationMixin<User, 'avatarImage'>

  declare getImageOfPlaces: HasManyGetAssociationsMixin<ImageOfPlace>
  declare addImageOfPlace: HasManyAddAssociationMixin<ImageOfPlace, number>
  declare addImageOfPlaces: HasManyAddAssociationsMixin<ImageOfPlace, number>
  declare setImageOfPlaces: HasManySetAssociationsMixin<ImageOfPlace, number>
  declare removeImageOfPlace: HasManyRemoveAssociationMixin<
    ImageOfPlace,
    number
  >

  declare removeImageOfPlaces: HasManyRemoveAssociationsMixin<
    ImageOfPlace,
    number
  >

  declare hasImageOfPlace: HasManyHasAssociationMixin<ImageOfPlace, number>
  declare hasImageOfPlaces: HasManyHasAssociationsMixin<ImageOfPlace, number>
  declare countImageOfPlaces: HasManyCountAssociationsMixin
  declare createImageOfPlace: HasManyCreateAssociationMixin<
    ImageOfPlace,
    'imageId'
  >

  declare users?: NonAttribute<User>
  declare imageOfPlaces?: NonAttribute<ImageOfPlace[]>

  declare static associations: {
    users: Association<Image, User>
    imageOfPlaces: Association<Image, ImageOfPlace>
  }

  static config (sequelize: Sequelize): InitOptions<Image> {
    return {
      sequelize,
      tableName: IMAGE_TABLE,
      modelName: 'Image',
      timestamps: false
    }
  }
}

const ImageAttributes: ModelAttributes<Image, InferAttributes<Image>> = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  path: {
    unique: true,
    type: DataTypes.STRING(255),
    allowNull: false,
    get () {
      const rawValue = this.getDataValue('path')
      return rawValue.substring(0, 4) === 'api '
        ? APP_URL + rawValue.substring(4)
        : rawValue
    }
  }
}

export { Image, ImageAttributes, IMAGE_TABLE }
