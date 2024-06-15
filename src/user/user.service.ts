import { Injectable } from '@nestjs/common'
import { UserRepo } from './user.repo'
import { User } from './user.entity'
import { AppError } from '../common/app-error/app-error'
import { DB_DUPLICATE_CONFLICT } from '../common/app-error/error-codes'
import { PasswordService } from '../common/services/password.service'

@Injectable()
export class UserService {
  constructor (private usersRepo: UserRepo) {}

  async getUser (userId: User['id']) {
    return this.usersRepo.getUserById(userId)
  }

  async getUserByEmail (email: User['email']) {
    return this.usersRepo.getUserByEmail(email)
  }

  async createUser (user: User):Promise<User> {
    const existingUser = await this.usersRepo.getUserByEmail(user.email)
    if (existingUser) {
      throw new AppError({ ...DB_DUPLICATE_CONFLICT })
    }

    const hash = await PasswordService.hashPassword(user.password)

    const newUser = await this.usersRepo.createUser({ ...user, password: hash })
    return { ...newUser, password: undefined }
  }

  updateUser (user: User) {
    return this.usersRepo.updateUser(user)
  }
}
