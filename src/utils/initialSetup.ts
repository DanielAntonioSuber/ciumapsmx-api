import { APP_ROLES } from '../config/app'
import { Role } from '../database/models/Role'

async function createRoles () {
  const result = await Role.findAndCountAll()
  if (result.count !== 0) {
    const roles: Role[] = []
    APP_ROLES.forEach(async (appRole) => {
      const role = await Role.create(appRole)
      roles.push(role)
    })
    console.log('Roles were created:', roles)
  }
}

function createAdmins () {}

async function initialSetup () {
  await createRoles()
  createAdmins()
}

export default initialSetup
