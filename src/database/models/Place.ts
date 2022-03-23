import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InitOptions,
  Model,
  ModelAttributes,
  Sequelize
} from 'sequelize'

const PLACE_TABLE = 'places'

class Place extends Model {
  declare id: CreationOptional<number>
  declare kind: number
  declare name: string
  declare description: string
  declare direction: string
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  static config (sequelize: Sequelize): InitOptions<Place> {
    return {
      sequelize,
      tableName: PLACE_TABLE,
      modelName: 'Place'
    }
  }
}

const PlaceAttributes: ModelAttributes<Place, InferAttributes<Place>> = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'kind_of_place_id'
  },
  name: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false
  },
  description: { type: DataTypes.TEXT },
  direction: { type: DataTypes.STRING(100), allowNull: false },
  kind: { type: DataTypes.INTEGER, allowNull: false },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}

export { Place, PlaceAttributes }
