import { User } from '../database/models/User'
import ImageService from '../services/ImageService'
import PlaceService from '../services/PlaceService'
import UserService from '../services/UserService'

async function createRoles () {
  const userService = new UserService()
  await userService.createRoles()
}

async function createAdmins () {
  const imageService = new ImageService()
  const userService = new UserService()
  User.findOrCreate({
    where: { username: 'admin1' },
    defaults: {
      avatarImage: (await imageService.getDefaultAvatar())!.id,
      email: 'admin1@email.com',
      password: 'adminpassword',
      roleId: userService.getRoles().find((e) => e.name === 'admin')!.id,
      username: 'admin1'
    }
  })

  User.findOrCreate({
    where: { username: 'admin2' },
    defaults: {
      avatarImage: (await imageService.getDefaultAvatar())!.id,
      email: 'admin2@email.com',
      password: 'adminpassword',
      roleId: userService.getRoles().find((e) => e.name === 'admin')!.id,
      username: 'admin2'
    }
  })
}

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
  await createDefaultAvatar()
  await createTypesOfPlaces()
  await createAdmins()
}

export default initialSetup
