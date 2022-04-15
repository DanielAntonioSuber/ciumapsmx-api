import {
  Association,
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
import { Place } from './Place'
import { User } from './User'

const PLACE_REVIEW_TABLE = 'place_reviews'

class PlaceReview extends Model<
  InferAttributes<PlaceReview>,
  InferCreationAttributes<PlaceReview>
> {
  declare id: CreationOptional<number>
  declare userId: number
  declare placeId: number
  declare starScore: number
  declare securityScore: number

  declare getUser: BelongsToGetAssociationMixin<User>
  declare setUser: BelongsToSetAssociationMixin<User, number>
  declare createUser: BelongsToCreateAssociationMixin<User>

  declare getPlace: BelongsToGetAssociationMixin<Place>
  declare setPlace: BelongsToSetAssociationMixin<Place, number>
  declare createPlace: BelongsToCreateAssociationMixin<Place>

  declare user?: NonAttribute<User>
  declare place?: NonAttribute<Place>

  public declare static associations: {
    user: Association<PlaceReview, User>
    place: Association<PlaceReview, Place>
  }

  static config (sequelize: Sequelize): InitOptions<PlaceReview> {
    return {
      sequelize,
      tableName: PLACE_REVIEW_TABLE,
      timestamps: false
    }
  }
}

const PlaceReviewAttributes: ModelAttributes<
  PlaceReview,
  InferAttributes<PlaceReview>
> = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  placeId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  starScore: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0
  },
  securityScore: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0
  }
}

export { PlaceReview, PlaceReviewAttributes }
