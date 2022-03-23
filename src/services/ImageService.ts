import { Image } from '../database/models/Image'

class ImageService {
  avatarPath = 'api public/images/avatar.webp'

  async createDefaultAvatar () {
    const result = await Image.findOrCreate({
      where: { path: this.avatarPath, name: 'avatarImage' }
    })

    if (result[1]) console.log('Default avatar was created: ')
  }

  async getDefaultAvatar () {
    return await Image.findOne({
      where: { path: this.avatarPath, name: 'avatarImage' }
    })
  }
}

export default ImageService
