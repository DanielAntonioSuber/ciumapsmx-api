import { APP_ROLES } from '../config/app'
import { Role } from '../database/models/Role'

async function createRoles () {
  const result = await Role.findAndCountAll()
  if (result.count === 0) {
    for (const appRole of APP_ROLES) {
      await Role.create(appRole)
    }
    console.log(
      'Roles were created:',
      APP_ROLES.map((role) => role.name)
    )
  }
}

function createAdmins () {}

async function initialSetup () {
  await createRoles()
  createAdmins()
}

export default initialSetup
