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
  Sequelize
} from 'sequelize'
import { Place } from './Place'
import { User } from './User'

const COMMENT_TABLE = 'comments'

class Comment extends Model<
  InferAttributes<Comment>,
  InferCreationAttributes<Comment>
> {
  declare id: CreationOptional<number>
  declare placeId: number
  declare userId: number
  declare text: string
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  declare getPlace: BelongsToGetAssociationMixin<Place>
  declare setPlace: BelongsToSetAssociationMixin<Place, number>
  declare createPlace: BelongsToCreateAssociationMixin<Place>

  declare getUser: BelongsToGetAssociationMixin<User>
  declare setUser: BelongsToSetAssociationMixin<User, number>
  declare createUser: BelongsToCreateAssociationMixin<User>

  declare static associations: {
    place: Association<Comment, Place>
    user: Association<Comment, User>
  }

  static config (sequelize: Sequelize): InitOptions<Comment> {
    return {
      sequelize: sequelize,
      tableName: COMMENT_TABLE,
      timestamps: true
    }
  }
}

const CommentAttributes: ModelAttributes<Comment, InferAttributes<Comment>> = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  placeId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  text: { type: DataTypes.TEXT },
  createdAt: { type: DataTypes.DATE },
  updatedAt: { type: DataTypes.DATE }
}

export { Comment, CommentAttributes }
