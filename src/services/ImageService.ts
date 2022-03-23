import { Image } from '../database/models/Image'

class ImageService {
  avatarPath = 'api public/images/avatar.webp'

  async createDefaultAvatar () {
    const [avatar, created] = await Image.findOrCreate({
      where: { path: this.avatarPath, name: 'avatarImage' }
    })

    if (created) console.log('Default avatar was created: ', avatar)
  }

  async getDefaultAvatar () {
    return await Image.findOne({
      where: { path: this.avatarPath, name: 'avatarImage' }
    })
  }
}

export default ImageService
