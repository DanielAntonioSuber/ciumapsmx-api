import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt'
import { JWT_SECRET } from '../config/app'
import UserService from '../services/UserService'

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET
}

export default new Strategy(opts, async (payload, done) => {
  try {
    const userService = new UserService()
    const user = await userService.findById(payload.id)

    if (user) {
      const { id, email, username } = user
      return done(null, { id, email, username })
    }
    return done(null, false)
  } catch (error) {
    console.log(error)
  }
})
