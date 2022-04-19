import { NextFunction, Request, Response } from 'express'
import { check } from 'express-validator'
import UserService from '../services/UserService'
import validateResult from '../utils/validateResult'

class AuthValidator {
  private async checkDuplicateUser (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { username, email } = req.body
    const userService = new UserService()

    const userByUsername = await userService.findOneByUsername(username)
    if (userByUsername) {
      return res.status(400).json({ message: 'El usuario ya existe' })
    }

    const userByEmail = await userService.findOneByEmail(email)
    if (userByEmail) {
      return res.status(400).json({ message: 'El correo ya existe' })
    }

    next()
  }

  signUp = [
    check('username').exists().not().isEmpty(),
    check('email').exists().isEmail().not().isEmpty(),
    check('role').exists(),
    check('password').exists(),
    validateResult,
    this.checkDuplicateUser
  ]

  signIn = [
    check('email').optional().exists(),
    check('username').optional().exists(),
    check('password').exists().notEmpty(),
    validateResult
  ]
}

export default AuthValidator
