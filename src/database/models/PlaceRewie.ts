import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InitOptions,
  Model,
  ModelAttributes,
  Sequelize
} from 'sequelize'

const PLACE_REVIEW_TABLE = 'place_reviews'

class PlaceReview extends Model {
  declare id: CreationOptional<number>
  declare user: number
  declare place: number
  declare starScore: number
  declare securityScore: number

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
