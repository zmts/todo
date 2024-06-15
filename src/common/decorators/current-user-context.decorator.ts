import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { ICurrentUserContext } from '../interfaces/current-user.interface'

export const CurrentUserContext = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): ICurrentUserContext => {
    const request = ctx.switchToHttp().getRequest()
    const { currentUser } = request
    return currentUser
  }
)
