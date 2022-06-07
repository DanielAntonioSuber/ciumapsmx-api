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
  NonAttribute,
  Association
} from 'sequelize'
import { Report } from './Report'

const EVENT_TABLE = 'events'

class Event extends Model<
  InferAttributes<Event>,
  InferCreationAttributes<Event>
> {
  declare id: CreationOptional<number>
  declare type: 'supportEngineer' | 'maintenanceEnginner'
  declare isSolved: boolean
  declare reportId: number

  declare getReport: BelongsToGetAssociationMixin<Report>
  declare setReport: BelongsToSetAssociationMixin<Report, number>
  declare createReport: BelongsToCreateAssociationMixin<Report>

  declare report?: NonAttribute<Event>

  public declare static associations: {
    report: Association<Event, Report>
  }

  static config (sequelize: Sequelize): InitOptions<Event> {
    return {
      sequelize: sequelize,
      tableName: EVENT_TABLE,
      timestamps: false
    }
  }
}

const EventAttributes: ModelAttributes<Event, InferAttributes<Event>> = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  isSolved: { type: DataTypes.BOOLEAN, allowNull: true },
  type: DataTypes.STRING,
  reportId: DataTypes.INTEGER.UNSIGNED
}

export { Event, EventAttributes }
