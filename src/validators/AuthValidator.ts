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

    const userByUsername = await userService.findByUsername(username)
    if (userByUsername) {
      return res.status(400).json({ message: 'The user already exists' })
    }

    const userByEmail = await userService.findByEmail(email)
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
    validateResult,
    this.checkDuplicateUser
  ]

  signIn = [
    check('email').exists().isEmail(),
    check('username').exists(),
    check('password').exists().notEmpty(),
    validateResult
  ]
}

export default AuthValidator
