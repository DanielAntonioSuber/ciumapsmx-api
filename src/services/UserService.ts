import bcrypt from 'bcrypt'
import { User } from '../database/models/User'

class UserService {
  async create (user: User) {
    const hash = await bcrypt.hash(user.password, await bcrypt.genSalt(10))
    return await User.create({
      ...user,
      password: hash
    })
  }

  async findByEmail (email: string) {
    return await User.findOne({ where: { email } })
  }

  async findByUsername (username: string) {
    return await User.findOne({ where: { username } })
  }
}

export default UserService
