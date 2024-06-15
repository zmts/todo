import { Algorithm } from 'jsonwebtoken'
import { Injectable } from '@nestjs/common'
import { AppError } from '../common/app-error/app-error'
import { AUTH, NOT_FOUND } from '../common/app-error/error-codes'
import { PasswordService } from '../common/services/password.service'
import { AuthTokenEnum } from './interfaces/auth-token.enum'
import { JwtService } from '../common/services/jwt.service'
import { appConfig } from '../config/app/app.config'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor (
    private usersService: UserService
  ) {}

  async getAccessToken (loginPayload: { email: string, password: string }): Promise<{ accessToken: string }> {
    const user = await this.usersService.getUserByEmail(loginPayload.email)
    if (!user) throw new AppError({
      ...NOT_FOUND
    })

    const isPasswordValid = await PasswordService
      .checkPassword({
        password: loginPayload.password,
        hash: user.password
      })

    if (isPasswordValid) {
      const payload = {
        tokenType: AuthTokenEnum.TYPE_ACCESS,
        role: user.role,
        email: user.email,
        iss: appConfig.appName
      }

      const SECRET = appConfig.jwtOptions.secret

      const options = {
        algorithm: 'HS512' as Algorithm,
        subject: String(user.id),
        expiresIn: appConfig.jwtOptions.exp
      }

      const token = await JwtService.jwtSign(payload, SECRET, options)
      return { accessToken: token }
    } else {
      throw new AppError({ ...AUTH })
    }
  }
}
