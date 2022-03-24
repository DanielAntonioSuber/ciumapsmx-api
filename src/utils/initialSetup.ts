import ImageService from '../services/ImageService'
import KindOfPlaceService from '../services/KindOfPlaceService'
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

async function createTypesOfPlaces () {
  const kindOfPlaceService = new KindOfPlaceService()
  await kindOfPlaceService.createInitialValues()
}

async function initialSetup () {
  await createRoles()
  createAdmins()
  createDefaultAvatar()
  createTypesOfPlaces()
}

export default initialSetup
