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

const USER_TABLE = 'users'

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>
  declare role: number
  declare username: string
  declare password: string
  declare email: string
  declare avatarImage: number

  static config (sequelize: Sequelize): InitOptions<User> {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User'
    }
  }
}

const UserAttributes: ModelAttributes<User, InferAttributes<User>> = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: 'user_id',
    autoIncrement: true,
    allowNull: false
  },
  role: { type: DataTypes.INTEGER, allowNull: false },
  username: { type: DataTypes.STRING(40), allowNull: false },
  password: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(40), allowNull: false },
  avatarImage: {
    type: DataTypes.NUMBER,
    field: 'avatar_image',
    allowNull: false
  }
}

export { User, UserAttributes }
