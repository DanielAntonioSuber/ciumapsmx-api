import {
  Sequelize,
  InitOptions,
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
  ModelAttributes,
  DataTypes,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
  Association,
  NonAttribute,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
  HasOneCreateAssociationMixin
} from 'sequelize'
import { Event } from './Event'
import { User } from './User'

const REPORT_TABLE = 'reports'

class Report extends Model<
  InferAttributes<Report>,
  InferCreationAttributes<Report>
> {
  declare id: CreationOptional<number>
  declare problem: string
  declare description: string
  declare userId: number
  declare answer: CreationOptional<string>
  declare isFAQ: CreationOptional<boolean>

  declare getUser: BelongsToGetAssociationMixin<User>
  declare setUser: BelongsToSetAssociationMixin<User, number>
  declare createUser: BelongsToCreateAssociationMixin<User>

  declare getReport: HasOneGetAssociationMixin<Report>
  declare setReport: HasOneSetAssociationMixin<Report, number>
  declare createReport: HasOneCreateAssociationMixin<Report>

  declare user?: NonAttribute<User>
  declare event?: NonAttribute<Event>

  public declare static associations: {
    user: Association<Report, User>
    event: Association<Report, Event>
  }

  static config (sequelize: Sequelize): InitOptions<Report> {
    return {
      sequelize: sequelize,
      tableName: REPORT_TABLE,
      timestamps: false
    }
  }
}

const ReportAttributes: ModelAttributes<Report, InferAttributes<Report>> = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  isFAQ: { type: DataTypes.BOOLEAN, defaultValue: false },
  answer: { type: DataTypes.STRING, allowNull: true },
  userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  problem: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false }
}

export { Report, ReportAttributes }
