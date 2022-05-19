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
import { Comment } from './Comment'
import { ImageOfPlace } from './ImageOfPlace'
import { KindOfPlace } from './KindOfPlace'
import { PlaceScore } from './PlaceScore'

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

  declare getPlaceScores: HasManyGetAssociationsMixin<PlaceScore>
  declare addPlaceScore: HasManyAddAssociationMixin<PlaceScore, number>
  declare addPlaceScores: HasManyAddAssociationsMixin<PlaceScore, number>
  declare setPlaceScores: HasManySetAssociationsMixin<PlaceScore, number>
  declare removePlaceScore: HasManyRemoveAssociationMixin<PlaceScore, number>
  declare removePlaceScores: HasManyRemoveAssociationsMixin<
    PlaceScore,
    number
  >

  declare hasPlaceScore: HasManyHasAssociationMixin<PlaceScore, number>
  declare hasPlaceScores: HasManyHasAssociationsMixin<PlaceScore, number>
  declare countPlaceScores: HasManyCountAssociationsMixin
  declare createPlaceScore: HasManyCreateAssociationMixin<
    PlaceScore,
    'placeId'
  >

  declare getComments: HasManyGetAssociationsMixin<Comment>
  declare addComment: HasManyAddAssociationMixin<Comment, number>
  declare addComments: HasManyAddAssociationsMixin<Comment, number>
  declare setComments: HasManySetAssociationsMixin<Comment, number>
  declare removeComment: HasManyRemoveAssociationMixin<Comment, number>
  declare removeComments: HasManyRemoveAssociationsMixin<Comment, number>
  declare hasComment: HasManyHasAssociationMixin<Comment, number>
  declare hasComments: HasManyHasAssociationsMixin<Comment, number>
  declare countComments: HasManyCountAssociationsMixin
  declare createComment: HasManyCreateAssociationMixin<Comment, 'placeId'>

  declare imageOfPlaces?: NonAttribute<ImageOfPlace[]>
  declare placeScores?: NonAttribute<PlaceScore[]>
  declare kindOfPlace?: NonAttribute<KindOfPlace>
  declare comments?: NonAttribute<Comment>

  public declare static associations: {
    imageOfPlaces: Association<Place, ImageOfPlace>
    placeScores: Association<Place, PlaceScore>
    kindOfPlace: Association<Place, KindOfPlace>
    comments: Association<Place, Comment>
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
