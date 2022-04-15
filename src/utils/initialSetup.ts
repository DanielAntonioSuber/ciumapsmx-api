import ImageService from '../services/ImageService'
import PlaceService from '../services/PlaceService'
import UserService from '../services/UserService'

async function createRoles () {
  const userService = new UserService()
  await userService.createRoles()
}

function createAdmins () {}

async function createDefaultAvatar () {
  const imageService = new ImageService()
  await imageService.createDefaultAvatar()
}

async function createTypesOfPlaces () {
  const kindOfPlaceService = new PlaceService()
  await kindOfPlaceService.createInitialValues()
}

async function initialSetup () {
  await createRoles()
  createAdmins()
  createDefaultAvatar()
  createTypesOfPlaces()
}

export default initialSetup
