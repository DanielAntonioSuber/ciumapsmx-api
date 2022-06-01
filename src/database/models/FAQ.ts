import {
  Sequelize,
  InitOptions,
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
  ModelAttributes,
  DataTypes
} from 'sequelize'

const FAQ_TABLE = 'faqs'

class FAQ extends Model<InferAttributes<FAQ>, InferCreationAttributes<FAQ>> {
  declare id: CreationOptional<number>
  declare question: string
  declare answer: string

  static config (sequelize: Sequelize): InitOptions<FAQ> {
    return {
      sequelize: sequelize,
      tableName: FAQ_TABLE,
      timestamps: false
    }
  }
}

const FAQAttributes: ModelAttributes<FAQ, InferAttributes<FAQ>> = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  question: { type: DataTypes.STRING, allowNull: false },
  answer: { type: DataTypes.TEXT, allowNull: false }
}

export { FAQ, FAQAttributes }
