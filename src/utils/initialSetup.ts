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

  User.findOrCreate({
    where: { username: 'moderator1' },
    defaults: {
      avatarImage: (await imageService.getDefaultAvatar())!.id,
      email: 'moderator1@email.com',
      password: 'moderatorpassword',
      roleId: userService.getRoles().find((e) => e.name === 'moderator')!.id,
      username: 'moderator1'
    }
  })

  User.findOrCreate({
    where: { username: 'moderator2' },
    defaults: {
      avatarImage: (await imageService.getDefaultAvatar())!.id,
      email: 'moderator2@email.com',
      password: 'moderatorpassword',
      roleId: userService.getRoles().find((e) => e.name === 'moderator')!.id,
      username: 'moderator2'
    }
  })

  // support
  User.findOrCreate({
    where: { username: 'ingenieroSoporte' },
    defaults: {
      avatarImage: (await imageService.getDefaultAvatar())!.id,
      email: 'ingenieroSoporte@email.com',
      password: 'password',
      roleId: userService.getRoles().find((e) => e.name === 'supportEngineer')!.id,
      username: 'ingenieroSoporte'
    }
  })
  User.findOrCreate({
    where: { username: 'ingenieroMantenimiento' },
    defaults: {
      avatarImage: (await imageService.getDefaultAvatar())!.id,
      email: 'ingenieroMantenimiento@email.com',
      password: 'password',
      roleId: userService.getRoles().find((e) => e.name === 'maintenanceEnginner')!.id,
      username: 'ingenieroMantenimiento'
    }
  })
  User.findOrCreate({
    where: { username: 'asesorSoporte' },
    defaults: {
      avatarImage: (await imageService.getDefaultAvatar())!.id,
      email: 'asesorSoporte@email.com',
      password: 'password',
      roleId: userService.getRoles().find((e) => e.name === 'supportAdvisor')!.id,
      username: 'asesorSoporte'
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
