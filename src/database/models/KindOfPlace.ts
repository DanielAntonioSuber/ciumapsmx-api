import {
  Association,
  CreationOptional,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  InitOptions,
  Model,
  ModelAttributes,
  NonAttribute,
  Sequelize
} from 'sequelize'
import { Place } from './Place'

const KIND_OF_PLACE_TABLE = 'types_of_places'

class KindOfPlace extends Model<
  InferAttributes<KindOfPlace, { omit: 'places' }>,
  InferCreationAttributes<KindOfPlace, { omit: 'places' }>
> {
  declare id: CreationOptional<number>
  declare name: string

  declare getPlaces: HasManyGetAssociationsMixin<Place>
  declare addPlace: HasManyAddAssociationMixin<Place, number>
  declare addPlaces: HasManyAddAssociationsMixin<Place, number>
  declare setPlaces: HasManySetAssociationsMixin<Place, number>
  declare removePlace: HasManyRemoveAssociationMixin<Place, number>
  declare removePlaces: HasManyRemoveAssociationsMixin<Place, number>
  declare hasPlace: HasManyHasAssociationMixin<Place, number>
  declare hasPlaces: HasManyHasAssociationsMixin<Place, number>
  declare countPlaces: HasManyCountAssociationsMixin
  declare createPlace: HasManyCreateAssociationMixin<Place, 'kind'>

  declare places: NonAttribute<Place>

  declare static associations: {
    places: Association<KindOfPlace, Place>
  }

  static config (sequelize: Sequelize): InitOptions<KindOfPlace> {
    return {
      sequelize,
      tableName: KIND_OF_PLACE_TABLE,
      timestamps: false
    }
  }
}

const KindOfPlaceAttributes: ModelAttributes<
  KindOfPlace,
  InferAttributes<KindOfPlace>
> = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
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
