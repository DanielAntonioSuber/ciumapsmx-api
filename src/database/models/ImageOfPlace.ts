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
import { Image } from './Image'
import { Place } from './Place'

const IMAGE_OF_PLACE_TABLE = 'images_of_places'

class ImageOfPlace extends Model<
  InferAttributes<ImageOfPlace>,
  InferCreationAttributes<ImageOfPlace>
> {
  declare id: CreationOptional<number>
  declare place: number
  declare placeImage: number

  declare getPlace: BelongsToGetAssociationMixin<Place>
  declare setPlace: BelongsToSetAssociationMixin<Place, number>
  declare createPlace: BelongsToCreateAssociationMixin<Place>

  declare getImage: BelongsToGetAssociationMixin<Image>
  declare setImage: BelongsToSetAssociationMixin<Image, number>
  declare createImage: BelongsToCreateAssociationMixin<Image>

  static config (sequelize: Sequelize): InitOptions<ImageOfPlace> {
    return {
      sequelize,
      tableName: IMAGE_OF_PLACE_TABLE,
      modelName: 'ImageOfPlace',
      timestamps: false
    }
  }
}

const ImageOfPlaceAttributes: ModelAttributes<
  ImageOfPlace,
  InferAttributes<ImageOfPlace>
> = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  place: { type: DataTypes.INTEGER, allowNull: false },
  placeImage: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'place_image'
  }
}

export { ImageOfPlace, ImageOfPlaceAttributes }
