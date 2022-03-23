import ImageService from '../services/ImageService'
import RoleService from '../services/RoleService'

async function createRoles () {
  const roleService = new RoleService()
  await roleService.createRoles()
}

function createAdmins () {}

async function createDefaultAvatar () {
  const imageService = new ImageService()
  await imageService.createDefaultAvatar()
}

async function initialSetup () {
  await createRoles()
  createAdmins()
  createDefaultAvatar()
}

export default initialSetup
