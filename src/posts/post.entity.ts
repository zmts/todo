import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn, Generated,
} from 'typeorm'
import { User } from '../user/user.entity'
import { BaseEntity } from '../common/repo/base.entity'


@Entity()
export class Post extends BaseEntity {
  @Column()
  @Generated('uuid')
  uuid?: string

  @Column({ default: null, nullable: true })
  title?: string

  @Column({ default: null, nullable: true })
  content?: string

  @Column({ default: false })
  isFeatured?: boolean

  @Column({ default: false })
  isDraft?: boolean

  @ManyToOne(type => User)
  user?: User

  @JoinColumn({ name: 'userId' })
  @Column({ nullable: true })
  userId?: number

  toJSON? () {
    return {
      ...this,
      id: undefined
    }
  }
}
