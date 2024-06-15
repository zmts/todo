import {
  Entity,
  Column,
  Generated,
} from 'typeorm'
import { UserRoles } from './interfaces/user.types'
import { BaseEntity } from '../common/repo/base.entity'

@Entity()
export class User extends BaseEntity {
  @Column()
  @Generated('uuid')
  uuid?: string

  @Column({ default: UserRoles.user })
  role?: UserRoles

  @Column({ unique: true })
  email?: string

  @Column({ nullable: true })
  password?: string

  @Column({ nullable: true })
  firstName?: string

  @Column({ nullable: true })
  secondName?: string

  toJSON? () {
    return {
      ...this,
      password: undefined
    }
  }
}
