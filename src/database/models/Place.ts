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
import { ImageOfPlace } from './ImageOfPlace'
import { KindOfPlace } from './KindOfPlace'
import { PlaceReview } from './PlaceReview'

const PLACE_TABLE = 'places'

class Place extends Model<
  InferAttributes<Place>,
  InferCreationAttributes<Place>
> {
  declare id: CreationOptional<number>
  declare kind: CreationOptional<number>
  declare name: string
  declare description: string
  declare direction: string
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

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
    'placeId'
  >

  declare getKindOfPlace: BelongsToGetAssociationMixin<KindOfPlace>
  declare setKindOfPlace: BelongsToSetAssociationMixin<KindOfPlace, number>
  declare createKindOfPlace: BelongsToCreateAssociationMixin<KindOfPlace>

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

  declare imageOfPlaces?: NonAttribute<ImageOfPlace[]>
  declare placeReviews?: NonAttribute<PlaceReview[]>
  declare kindOfPlace?: NonAttribute<KindOfPlace>

  public declare static associations: {
    imageOfPlaces: Association<Place, ImageOfPlace>
    placeReviews: Association<Place, PlaceReview>
    kindOfPlace: Association<Place, KindOfPlace>
  }

  static config (sequelize: Sequelize): InitOptions<Place> {
    return {
      sequelize,
      tableName: PLACE_TABLE
    }
  }
}

const PlaceAttributes: ModelAttributes<Place, InferAttributes<Place>> = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false
  },
  description: { type: DataTypes.TEXT },
  direction: { type: DataTypes.STRING(100), allowNull: false },
  kind: { type: DataTypes.INTEGER.UNSIGNED },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}

export { Place, PlaceAttributes }
