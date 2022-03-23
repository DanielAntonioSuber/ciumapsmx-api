import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  InitOptions,
  Model,
  ModelAttributes,
  Sequelize
} from 'sequelize'

const KIND_OF_PLACE_TABLE = 'types_of_places'

class KindOfPlace extends Model<
  InferAttributes<KindOfPlace>,
  InferCreationAttributes<KindOfPlace>
> {
  declare id: CreationOptional<number>
  declare name: string

  static config (sequelize: Sequelize): InitOptions<KindOfPlace> {
    return {
      sequelize,
      tableName: KIND_OF_PLACE_TABLE,
      modelName: 'KindOfPlace'
    }
  }
}

const KindOfPlaceAttributes: ModelAttributes<
  KindOfPlace,
  InferAttributes<KindOfPlace>
> = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: 'kind_of_place_id',
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}

export { KindOfPlace, KindOfPlaceAttributes }
