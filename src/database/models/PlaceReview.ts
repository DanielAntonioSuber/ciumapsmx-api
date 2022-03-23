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
import { Place } from './Place'
import { User } from './User'

const PLACE_REVIEW_TABLE = 'place_reviews'

class PlaceReview extends Model<
InferAttributes<PlaceReview>,
InferCreationAttributes<PlaceReview>
> {
  declare id: CreationOptional<number>
  declare user: number
  declare place: number
  declare starScore: number
  declare securityScore: number

  declare getUser: BelongsToGetAssociationMixin<User>
  declare setUser: BelongsToSetAssociationMixin<User, number>
  declare createUser: BelongsToCreateAssociationMixin<User>

  declare getPlace: BelongsToGetAssociationMixin<Place>
  declare setPlace: BelongsToSetAssociationMixin<Place, number>
  declare createPlace: BelongsToCreateAssociationMixin<Place>

  static config (sequelize: Sequelize): InitOptions<PlaceReview> {
    return {
      sequelize,
      tableName: PLACE_REVIEW_TABLE,
      modelName: 'PlaceReview'
    }
  }
}

const PlaceReviewAttributes: ModelAttributes<
  PlaceReview,
  InferAttributes<PlaceReview>
> = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  user: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  place: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  starScore: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  securityScore: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}

export { PlaceReview, PlaceReviewAttributes }
