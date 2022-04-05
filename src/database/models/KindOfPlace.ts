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

const KIND_OF_PLACE_TABLE = 'types_of_places'

class KindOfPlace extends Model<
  InferAttributes<KindOfPlace>,
  InferCreationAttributes<KindOfPlace>
> {
  declare id: CreationOptional<number>
  declare name: string

  declare getPlace: BelongsToGetAssociationMixin<Place>
  declare setPlace: BelongsToSetAssociationMixin<Place, number>
  declare createPlace: BelongsToCreateAssociationMixin<Place>

  static config (sequelize: Sequelize): InitOptions<KindOfPlace> {
    return {
      sequelize,
      tableName: KIND_OF_PLACE_TABLE,
      modelName: 'KindOfPlace',
      timestamps: false
    }
  }
}

const KindOfPlaceAttributes: ModelAttributes<
  KindOfPlace,
  InferAttributes<KindOfPlace>
> = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  }
}

export { KindOfPlace, KindOfPlaceAttributes }
