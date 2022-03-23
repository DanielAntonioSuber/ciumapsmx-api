import { Role } from '../database/models/Role'

class RoleService {
  roles = [
    { id: 10, name: 'admin' },
    { id: 11, name: 'moderator' },
    { id: 12, name: 'seller' },
    { id: 13, name: 'tourist' }
  ]

  async createRoles () {
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
}

export default RoleService
