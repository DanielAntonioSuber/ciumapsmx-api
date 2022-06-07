import { Op } from 'sequelize'
import { Role } from '../database/models/Role'
import { User } from '../database/models/User'
import ImageService from './ImageService'

type userProps = {
  username: string
  email: string
  password: string
  role: string
}

class UserService {
  private roles = [
    { id: 10, name: 'admin' },
    { id: 11, name: 'moderator' },
    { id: 12, name: 'seller' },
    { id: 13, name: 'tourist' },
    { id: 14, name: 'supportAdvisor' },
    { id: 15, name: 'maintenanceEnginner' },
    { id: 16, name: 'supportEngineer' }
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

  createUser = async ({ username, email, password, role }: userProps) => {
    const imageService = new ImageService()

    return await User.create({
      username,
      email,
      roleId: this.getRoles().find((ROLE) => ROLE.name === role)!.id,
      password,
      avatarImage: (await imageService.getDefaultAvatar())!.id
    })
  }

  findOneById = async (id: number) => await User.findByPk(id)

  findOneByEmail = async (email: string) =>
    await User.findOne({ where: { email } })

  findOneByUsername = async (username: string) =>
    await User.findOne({ where: { username } })

  findOneByUsernameOrEmail = async (username: string, email: string) =>
    await User.findOne({
      where: { [Op.or]: [{ username }, { email }] },
      include: {
        attributes: ['path', 'name'],
        association: User.associations.image
      }
    })

  updateUser = async (
    userId: number,
    { email, password, username }: userProps
  ) => {
    const user = await User.findByPk(userId)
    user?.update({ email, password, username })
    return user
  }
}

export default UserService
