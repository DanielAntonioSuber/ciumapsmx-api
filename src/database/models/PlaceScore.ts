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

const PLACE_SCORE_TABLE = 'place_scores'

class PlaceScore extends Model<
  InferAttributes<PlaceScore>,
  InferCreationAttributes<PlaceScore>
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
    user: Association<PlaceScore, User>
    place: Association<PlaceScore, Place>
  }

  static config (sequelize: Sequelize): InitOptions<PlaceScore> {
    return {
      sequelize,
      tableName: PLACE_SCORE_TABLE,
      timestamps: false
    }
  }
}

const PlaceScoreAttributes: ModelAttributes<
  PlaceScore,
  InferAttributes<PlaceScore>
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

export { PlaceScore, PlaceScoreAttributes }
