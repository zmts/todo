import { UserRoles } from '../../user/interfaces/user.types'

export interface ICurrentUserContext {
  id: number | null
  role: UserRoles
  email: string | null
}
