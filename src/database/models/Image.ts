import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  InitOptions,
  Model,
  ModelAttributes,
  Sequelize
} from 'sequelize'

const IMAGE_TABLE = 'images'

class Image extends Model<
  InferAttributes<Image>,
  InferCreationAttributes<Image>
> {
  declare id: CreationOptional<number>
  declare name: string
  declare path: string

  static config (sequelize: Sequelize): InitOptions<Image> {
    return {
      sequelize,
      tableName: IMAGE_TABLE,
      modelName: 'User',
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
