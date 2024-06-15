import { ICurrentUserContext } from '../interfaces/current-user.interface'
import { AppError } from '../app-error/app-error'
import { ACCESS } from '../app-error/error-codes'

export const ownerPolicy = (currentUser: ICurrentUserContext, entity: { userId?: ICurrentUserContext['id'] }) => {
  if (currentUser.id !== entity.userId) {
    throw new AppError({ ...ACCESS })
  }
}
