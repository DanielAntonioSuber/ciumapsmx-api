import { Op } from 'sequelize/types'
import { User } from '../database/models/User'
import ImageService from './ImageService'
import RoleService from './RoleService'

class UserService {
  async create ({
    username,
    email,
    password,
    role
  }: {
    username: string
    email: string
    password: string
    role: string
  }) {
    const roleService = new RoleService()
    const imageService = new ImageService()
    return await User.create({
      username,
      email,
      role: roleService.getRoles().find((ROLE) => ROLE.name === role)!.id,
      password,
      avatarImage: (await imageService.getDefaultAvatar())!.id
    })
  }

  async findByEmail (email: string) {
    return await User.findOne({ where: { email } })
  }

  async findByUsername (username: string) {
    return await User.findOne({ where: { username } })
  }

  async findByUsernameOrEmail (username: string, email: string) {
    return await User.findOne({ where: { [Op.or]: [{ username }, { email }] } })
  }
}

export default UserService
