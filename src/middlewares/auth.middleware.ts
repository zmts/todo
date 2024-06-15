import { Injectable, NestMiddleware } from '@nestjs/common'
import { JwtService } from '../common/services/jwt.service'
import { CurrentUser } from '../common/current-user'
import { appConfig } from '../config/app/app.config'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use (req, res, next) {
    const authorization = req.headers['authorization'] || req.headers['Authorization']
    const bearer = authorization && authorization.startsWith('Bearer ') ? authorization : null
    const token = bearer ? bearer.split('Bearer ')[1] : null

    if (token) {
      try {
        const tokenData = await JwtService.jwtVerify(token, appConfig.jwtOptions.secret)
        req.currentUser = new CurrentUser({
          ...tokenData,
          id: Number(tokenData.sub)
        })
      } catch (e) {
        next(e)
      }
    } else {
      req.currentUser = new CurrentUser()
    }

    next()
  }
}
