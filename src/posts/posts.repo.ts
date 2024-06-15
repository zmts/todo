import { IFindOptions, IPage } from '../common/repo/repo.interface'
import { Post } from './post.entity'
import { User } from '../user/user.entity'
import { CatchDBError } from '../common/decorators/catch-db-error.decorator'
import { BaseRepository } from '../common/base.repo'
import { DataSource } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { AppError } from '../common/app-error/app-error'
import { NOT_FOUND } from '../common/app-error/error-codes'

@Injectable()
export class PostsRepo extends BaseRepository<Post> {
  constructor (private readonly dataSource: DataSource) {
    super(dataSource, Post)
  }

  @CatchDBError
  async getPostById (id: Post['id'], options: { throwNotFound: boolean } = { throwNotFound: true }) {
    const data = await this.orm.findOne({ where: { id } })

    if (options.throwNotFound && !data) {
      throw new AppError({ ...NOT_FOUND })
    }

    if (data) return data || null
  }

  @CatchDBError
  async getPostByUuid (uuid: Post['uuid'], options: { throwNotFound: boolean } = { throwNotFound: true }) {
    const data = await this.orm.findOne({ where: { uuid } })

    if (options.throwNotFound && !data) {
      throw new AppError({ ...NOT_FOUND })
    }

    if (data) return data || null
  }

  @CatchDBError
  async getPostsByUserId (userId: User['id'], options: IFindOptions<Post>): Promise<IPage<Post>> {
    const { pagination, filter, order } = options

    const [ items, total ] = await this.orm.findAndCount({
      relations: [], // ['user']
      where: { userId, ...filter },
      skip: pagination?.offset,
      take: pagination?.limit,
      order: { [order?.field]: order?.direction }
    })

    return { items, total }
  }

  @CatchDBError
  async createPost (post: Post): Promise<Post> {
    const { raw } = await this.orm.insert(post)
    return raw[0]
  }

  @CatchDBError
  async updatePost (post: Post): Promise<Post> {
    await this.orm.update(post.id, post)
    return post
  }
}

