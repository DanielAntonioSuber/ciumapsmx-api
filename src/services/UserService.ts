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
}

export default UserService
