import { NextFunction, Request, Response } from 'express'
import { check } from 'express-validator'
import { User } from '../database/models/User'

class AuthValidator {
  private async checkDuplicateUser (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { username, email } = req.body

    const userByUsername = await User.findOne({ where: { username: username } })
    if (userByUsername) {
      return res.status(400).json({ message: 'The user already exists' })
    }

    const userByEmail = await User.findOne({ where: { email: email } })
    if (userByEmail) {
      return res.status(400).json({ message: 'The email already exists' })
    }

    next()
  }

  signUp = [
    check('username').exists().not().isEmpty(),
    check('email').exists().isEmail().not().isEmpty(),
    check('role').exists(),
    check('password').exists(),
    this.checkDuplicateUser
  ]

  signIn = [
    check('email').optional().isEmail(),
    check('username').optional(),
    check('password').exists().notEmpty()
  ]
}

export default AuthValidator
