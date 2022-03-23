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

const IMAGE_OF_PLACE_TABLE = 'images_of_places'

class ImagesOfPlace extends Model<
  InferAttributes<ImagesOfPlace>,
  InferCreationAttributes<ImagesOfPlace>
> {
  declare id: CreationOptional<number>
  declare place: number
  declare placeImage: number

  static config (sequelize: Sequelize): InitOptions<ImagesOfPlace> {
    return {
      sequelize,
      tableName: IMAGE_OF_PLACE_TABLE,
      modelName: 'ImageOfPlace'
    }
  }
}

const ImagesOfPlaceAttributes: ModelAttributes<
  ImagesOfPlace,
  InferAttributes<ImagesOfPlace>
> = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  place: { type: DataTypes.INTEGER, allowNull: false },
  placeImage: { type: DataTypes.INTEGER, allowNull: false, field: 'place_image' }
}

export { ImagesOfPlace, ImagesOfPlaceAttributes }
