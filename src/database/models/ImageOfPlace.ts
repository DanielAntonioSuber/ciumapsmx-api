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
  NonAttribute,
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
  declare placeId: number
  declare imageId: number

  declare getPlace: BelongsToGetAssociationMixin<Place>
  declare setPlace: BelongsToSetAssociationMixin<Place, number>
  declare createPlace: BelongsToCreateAssociationMixin<Place>

  declare getImage: BelongsToGetAssociationMixin<Image>
  declare setImage: BelongsToSetAssociationMixin<Image, number>
  declare createImage: BelongsToCreateAssociationMixin<Image>

  declare place?: NonAttribute<Place>
  declare image?: NonAttribute<Image>

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
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  placeId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  imageId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  }
}

export { ImageOfPlace, ImageOfPlaceAttributes }
