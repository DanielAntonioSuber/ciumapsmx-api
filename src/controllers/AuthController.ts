import { Request, Response } from 'express'
import UserService from '../services/UserService'

class AuthController {
  service = new UserService()

  async signUp (req: Request, res: Response) {}

  async signIn (req: Request, res: Response) {}
}

export default AuthController
