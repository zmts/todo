import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { User } from './user.entity'
import { CatchDBError } from '../common/decorators/catch-db-error.decorator'
import { BaseRepository } from '../common/base.repo'

@Injectable()
export class UserRepo extends BaseRepository<User> {
  constructor (private readonly dataSource: DataSource) {
    super(dataSource, User)
  }

  @CatchDBError
  async getUserById (id: User['id']): Promise<User | null> {
    const data = await this.orm.findOne({ where: { id } })
    if (data) return data || null
  }

  @CatchDBError
  async getUserByEmail (email: User['email']): Promise<User | null> {
    const data = await this.orm.findOne({ where: { email } })
    if (data) return data || null
  }

  @CatchDBError
  async createUser (user: User): Promise<User> {
    const { raw } = await this.orm.insert(user)
    const newUser = raw[0]
    delete newUser.password
    return newUser
  }

  @CatchDBError
  async updateUser (user: User): Promise<User> {
    await this.orm.update(user.id, user)
    return user
  }
}
