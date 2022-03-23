import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  InitOptions,
  Model,
  ModelAttributes,
  Sequelize
} from 'sequelize'

const ROLE_TABLE = 'roles'

class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
  declare id: number
  declare name: string

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
