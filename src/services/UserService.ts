import { Op } from 'sequelize'
import { Role } from '../database/models/Role'
import { User } from '../database/models/User'
import ImageService from './ImageService'

class UserService {
  private roles = [
    { id: 10, name: 'admin' },
    { id: 11, name: 'moderator' },
    { id: 12, name: 'seller' },
    { id: 13, name: 'tourist' }
  ]

  createRoles = async () => {
    const result = await Role.findAndCountAll()
    if (result.count === 0) {
      for (const role of this.roles) {
        await Role.create(role)
      }
      console.log(
        'Roles were created:',
        this.roles.map((role) => role.name)
      )
    }
  }

  getRoles () {
    return this.roles
  }

  create = async ({
    username,
    email,
    password,
    role
  }: {
    username: string
    email: string
    password: string
    role: string
  }) => {
    const imageService = new ImageService()

    return await User.create({
      username,
      email,
      roleId: this.getRoles().find((ROLE) => ROLE.name === role)!.id,
      password,
      avatarImage: (await imageService.getDefaultAvatar())!.id
    })
  }

  async findOneById (id: number) {
    return await User.findByPk(id)
  }

  async findOneByEmail (email: string) {
    return await User.findOne({ where: { email } })
  }

  async findOneByUsername (username: string) {
    return await User.findOne({ where: { username } })
  }

  async findOneByUsernameOrEmail (username: string, email: string) {
    return await User.findOne({
      where: { [Op.or]: [{ username }, { email }] },
      include: {
        attributes: ['path', 'name'],
        association: User.associations.image
      }
    })
  }
}

export default UserService
