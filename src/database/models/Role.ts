import {
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
  Sequelize
} from 'sequelize'
import { User } from './User'

const ROLE_TABLE = 'roles'

class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
  declare id: number
  declare name: string

  declare getUsers: HasManyGetAssociationsMixin<User>
  declare addUser: HasManyAddAssociationMixin<User, number>
  declare addUsers: HasManyAddAssociationsMixin<User, number>
  declare setUsers: HasManySetAssociationsMixin<User, number>
  declare removeUser: HasManyRemoveAssociationMixin<User, number>
  declare removeUsers: HasManyRemoveAssociationsMixin<User, number>
  declare hasUser: HasManyHasAssociationMixin<User, number>
  declare hasUsers: HasManyHasAssociationsMixin<User, number>
  declare countUsers: HasManyCountAssociationsMixin
  declare createUser: HasManyCreateAssociationMixin<User, 'role'>

  static config (sequelize: Sequelize): InitOptions<Role> {
    return {
      sequelize: sequelize,
      tableName: ROLE_TABLE,
      modelName: 'Role',
      timestamps: false
    }
  }
}

const RoleAttributes: ModelAttributes<Role, InferAttributes<Role>> = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: 'role_id'
  },
  name: { type: DataTypes.STRING(30), field: 'role_name' }
}

export { Role, RoleAttributes, ROLE_TABLE }
