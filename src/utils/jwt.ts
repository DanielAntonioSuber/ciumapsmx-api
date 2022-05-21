import { Request } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/app'

export const getUserJWT = (req: Request) =>
  jwt.verify(req.headers.authorization!.split(' ')[1], JWT_SECRET) as {
    id: number
    email: string
    username: string
  }
