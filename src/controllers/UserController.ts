import { Request, Response } from 'express'
import UserService from '../services/UserService'
import { getUserJWT } from '../utils/jwt'

class UserController {
  service = new UserService()
  updateUser = async (req: Request, res: Response) => {
    const userProps = req.body
    const { id } = getUserJWT(req)
    const updatedUser = this.service.updateUser(id, userProps)
    res.json(updatedUser)
  }
}

export default UserController
