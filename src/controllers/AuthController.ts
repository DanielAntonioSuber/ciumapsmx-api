import { Request, Response } from 'express'
import UserService from '../services/UserService'
import bcrypt from 'bcrypt'
import { JWT_SECRET } from '../config/app'
import jwt from 'jsonwebtoken'
import { User } from '../database/models/User'

async function comparePassword (password: string, encryptPassword: string) {
  return await bcrypt.compare(password, encryptPassword)
}

function createToken (user: User) {
  return jwt.sign(
    { id: user.id, email: user.email, username: user.username },
    JWT_SECRET,
    { expiresIn: 86400 }
  )
}

class AuthController {
  private service = new UserService()

  async signUp (req: Request, res: Response) {
    await this.service.create(req.body)
    res.status(201).json({ message: 'User was created' })
  }

  async signIn (req: Request, res: Response) {
    const { username, email, password } = req.body

    const user = await this.service.findByUsernameOrEmail(username, email)

    if (!user) {
      return res.status(400).json({ message: 'The User does not exists' })
    }

    const isMatch = await comparePassword(password, user.password)

    if (isMatch) {
      return res.status(200).json({
        token: createToken(user),
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: (await user.getRole()).name
        }
      })
    }

    return res.status(400).json({
      message: 'The email or password are incorrect'
    })
  }
}

export default AuthController
