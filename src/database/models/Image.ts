import {
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
  Sequelize
} from 'sequelize'
import { User } from './User'

const IMAGE_TABLE = 'images'

class Image extends Model<
  InferAttributes<Image>,
  InferCreationAttributes<Image>
> {
  declare id: CreationOptional<number>
  declare name: string
  declare path: string

  declare getUsers: HasManyGetAssociationsMixin<User>;
  declare addUser: HasManyAddAssociationMixin<User, number>;
  declare addUsers: HasManyAddAssociationsMixin<User, number>;
  declare setUsers: HasManySetAssociationsMixin<User, number>;
  declare removeUser: HasManyRemoveAssociationMixin<User, number>;
  declare removeUsers: HasManyRemoveAssociationsMixin<User, number>;
  declare hasUser: HasManyHasAssociationMixin<User, number>;
  declare hasUsers: HasManyHasAssociationsMixin<User, number>;
  declare countUsers: HasManyCountAssociationsMixin;
  declare createUser: HasManyCreateAssociationMixin<User, 'avatarImage'>;

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
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: 'image_id',
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'image_name'
  },
  path: { type: DataTypes.STRING(255), allowNull: false, field: 'image_path' }
}

export { Image, ImageAttributes, IMAGE_TABLE }
